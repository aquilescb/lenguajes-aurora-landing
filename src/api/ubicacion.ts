export type Ubicacion = {
  ciudad?: string;
  provincia?: string;
  pais?: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
};

export type UbicacionResponse = {
  success: boolean;
  ubicacion?: string; // Formato: "Ciudad, Provincia, País"
  error?: string;
};

/**
 * Obtiene la ubicación del usuario usando Geolocation API + geocodificación inversa
 */
export async function obtenerUbicacion(): Promise<UbicacionResponse> {
  try {
    // Verificar si el navegador soporta geolocalización
    if (!navigator.geolocation) {
      return {
        success: false,
        error: "Geolocalización no soportada por este navegador"
      };
    }

    // Obtener coordenadas del usuario
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000, // 10 segundos timeout
          maximumAge: 300000 // Cache por 5 minutos
        }
      );
    });

    const { latitude, longitude } = position.coords;
    console.log("Coordenadas obtenidas:", { latitude, longitude });

    // Usar API de geocodificación inversa (OpenStreetMap Nominatim - gratuita)
    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=es`;
    
    const response = await fetch(geocodingUrl, {
      headers: {
        'User-Agent': 'Aurora-Hotel-App/1.0' // Requerido por Nominatim
      }
    });

    if (!response.ok) {
      throw new Error(`Error en geocodificación: ${response.status}`);
    }

    const data = await response.json();
    console.log("Respuesta geocodificación:", data);

    // Extraer información de ubicación
    const address = data.address || {};
    const ciudad = address.city || address.town || address.village || address.municipality || "Ciudad desconocida";
    const provincia = address.state || address.province || "Provincia desconocida";
    const pais = address.country || "País desconocido";

    const ubicacionString = `${ciudad}, ${provincia}, ${pais}`;
    
    console.log("Ubicación procesada:", ubicacionString);

    return {
      success: true,
      ubicacion: ubicacionString
    };

  } catch (error: any) {
    console.error("Error obteniendo ubicación:", error);
    
    // Manejar errores específicos de geolocalización
    if (error.code) {
      switch (error.code) {
        case 1: // PERMISSION_DENIED
          return {
            success: false,
            error: "Permiso de ubicación denegado por el usuario"
          };
        case 2: // POSITION_UNAVAILABLE
          return {
            success: false,
            error: "Ubicación no disponible"
          };
        case 3: // TIMEOUT
          return {
            success: false,
            error: "Tiempo de espera agotado para obtener ubicación"
          };
        default:
          return {
            success: false,
            error: "Error desconocido de geolocalización"
          };
      }
    }

    return {
      success: false,
      error: error.message || "Error obteniendo ubicación"
    };
  }
}

/**
 * Obtiene ubicación con fallback a IP (alternativa si el usuario niega geolocalización)
 */
export async function obtenerUbicacionPorIP(): Promise<UbicacionResponse> {
  try {
    console.log("Intentando geolocalización por IP...");
    
    // Usar ipapi.co (gratuito hasta 1000 requests/día)
    const response = await fetch('https://ipapi.co/json/');
    
    if (!response.ok) {
      throw new Error(`Error en API de IP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Respuesta IP geolocation:", data);

    if (data.error) {
      throw new Error(data.reason || 'Error en API de IP');
    }

    const ubicacionString = `${data.city || 'Ciudad desconocida'}, ${data.region || 'Región desconocida'}, ${data.country_name || 'País desconocido'}`;

    return {
      success: true,
      ubicacion: ubicacionString
    };

  } catch (error: any) {
    console.error("Error con geolocalización por IP:", error);
    return {
      success: false,
      error: error.message || "Error obteniendo ubicación por IP"
    };
  }
}

/**
 * Función principal que intenta GPS primero, luego IP como fallback
 */
export async function obtenerUbicacionCompleta(): Promise<UbicacionResponse> {
  console.log("Iniciando obtención de ubicación...");
  
  // Intentar primero con GPS
  const ubicacionGPS = await obtenerUbicacion();
  
  if (ubicacionGPS.success) {
    console.log("Ubicación obtenida por GPS:", ubicacionGPS.ubicacion);
    return ubicacionGPS;
  }
  
  console.log("GPS falló, intentando con IP...");
  
  // Si GPS falla, intentar con IP
  const ubicacionIP = await obtenerUbicacionPorIP();
  
  if (ubicacionIP.success) {
    console.log("Ubicación obtenida por IP:", ubicacionIP.ubicacion);
    return ubicacionIP;
  }
  
  // Si ambos fallan
  console.log("Ambos métodos fallaron");
  return {
    success: false,
    error: "No se pudo obtener la ubicación del usuario"
  };
}
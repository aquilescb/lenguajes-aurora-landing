export type ReservaData = {
  // datos de persona
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  ubicacion?: string; // Nueva ubicación: "Ciudad, Provincia, País"
  // datos de reserva
  tipo_habitacion_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  observaciones?: string;
  // datos de pago
  cardName: string;
  cardNumber: string;
  cvc: string;
  expiry: string;
};

export type ReservaResponse = {
  success: boolean;
  message: string;
  data?: {
    reservaId: number;
    personaId: number;
    habitacion: {
      id: number;
      nombre: string;
      tipo: string;
    };
    fechas: {
      inicio: string;
      fin: string;
    };
    estado: string;
  };
};

export async function crearReserva(reservaData: ReservaData): Promise<ReservaResponse> {
  try {
    console.log("Enviando datos:", reservaData);
    
    const response = await fetch("/api/reservas/reservar-landing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservaData),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error response:", errorText);
      
      // Intentar parsear como JSON si es posible
      try {
        const errorJson = JSON.parse(errorText);
        return {
          success: false,
          message: errorJson.message || `Error HTTP ${response.status}`
        };
      } catch {
        return {
          success: false,
          message: `Error HTTP ${response.status}: ${errorText}`
        };
      }
    }

    const result: ReservaResponse = await response.json();
    console.log("Success result:", result);
    
    return result;
  } catch (error) {
    console.error("Error enviando reserva:", error);
    return {
      success: false,
      message: "Error de conexión. Por favor verifica tu conexión a internet e intenta nuevamente."
    };
  }
}
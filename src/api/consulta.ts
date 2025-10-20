export type ConsultaData = {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  texto: string; // Cambiado de 'mensaje' a 'texto' para coincidir con el backend
  ubicacion?: string;
};

export type ConsultaResponse = {
  success: boolean;
  message: string;
  data?: {
    consultaId: number;
    personaId: number;
  };
};

export async function crearConsulta(consultaData: ConsultaData): Promise<ConsultaResponse> {
  try {
    console.log("Enviando consulta:", consultaData);
    
    const response = await fetch("/api/consultas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consultaData),
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

    const result = await response.json();
    console.log("Success result:", result);
    
    return {
      success: true,
      message: result.message || "Consulta creada correctamente",
      data: {
        consultaId: result.consultaId,
        personaId: result.personaId
      }
    };
  } catch (error) {
    console.error("Error enviando consulta:", error);
    return {
      success: false,
      message: "Error de conexión. Por favor verifica tu conexión a internet e intenta nuevamente."
    };
  }
}
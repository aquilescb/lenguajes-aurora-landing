import { useState } from "react";
import { crearConsulta, type ConsultaData } from "../api/consulta";
import { obtenerUbicacionCompleta } from "../api/ubicacion";

export default function Consultas() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mostrarDatos, setMostrarDatos] = useState(false);
  const [resultadoConsulta, setResultadoConsulta] = useState<{
    success: boolean;
    message: string;
    data?: { consultaId: number; personaId: number };
  } | null>(null);
  const [consultaData, setConsultaData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConsultaData({ ...consultaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      // Obtener ubicación del usuario
      const ubicacionData = await obtenerUbicacionCompleta();
      console.log('Ubicación obtenida:', ubicacionData);
      
      // Usar la ubicación obtenida o un valor por defecto
      const ubicacionString = ubicacionData.success && ubicacionData.ubicacion
        ? ubicacionData.ubicacion
        : 'Ubicación no disponible';

      // Preparar datos para enviar al backend
      const datosConsulta: ConsultaData = {
        nombre: consultaData.nombre,
        apellido: consultaData.apellido,
        email: consultaData.email,
        telefono: consultaData.telefono || undefined,
        texto: consultaData.mensaje, // El backend espera 'texto', no 'mensaje'
        ubicacion: ubicacionString
      };

      const resultado = await crearConsulta(datosConsulta);
      
      setResultadoConsulta(resultado);
      
      if (resultado.success) {
        setMostrarDatos(true);
      }
      
    } catch (error) {
      console.error('Error procesando consulta:', error);
      setResultadoConsulta({
        success: false,
        message: 'Error inesperado al procesar la consulta. Intenta nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const limpiarFormulario = () => {
    setConsultaData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      mensaje: ""
    });
    setMostrarDatos(false);
    setResultadoConsulta(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-30 pb-15 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--nav-dark)] mb-4">
              Consultas
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ¿Tienes alguna pregunta o necesitas información adicional? 
              Completa el formulario y nos pondremos en contacto contigo.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Formulario */}
              <div className="p-8 lg:p-12">
                <h2 className="text-2xl font-bold text-[var(--nav-dark)] mb-6">
                  Envíanos tu consulta
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nombre y Apellido */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={consultaData.nombre}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--cta-blue)] focus:border-transparent transition-all"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        name="apellido"
                        value={consultaData.apellido}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--cta-blue)] focus:border-transparent transition-all"
                        placeholder="Tu apellido"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={consultaData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--cta-blue)] focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  {/* Teléfono (opcional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono <span className="text-gray-400">(opcional)</span>
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={consultaData.telefono}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--cta-blue)] focus:border-transparent transition-all"
                      placeholder="+54 9 11 1234-5678"
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="mensaje"
                      value={consultaData.mensaje}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--cta-blue)] focus:border-transparent transition-all resize-none"
                      placeholder="Escribe tu consulta aquí..."
                      required
                    />
                  </div>

                  {/* Botón de envío */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : 'bg-[var(--cta-blue)] text-white hover:bg-blue-600 hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando consulta...
                      </div>
                    ) : (
                      'Enviar Consulta'
                    )}
                  </button>
                </form>

                {/* Mostrar resultado */}
                {resultadoConsulta && (
                  <div className={`mt-8 p-6 border rounded-lg ${
                    resultadoConsulta.success 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${
                      resultadoConsulta.success 
                        ? 'text-green-800' 
                        : 'text-red-800'
                    }`}>
                        {resultadoConsulta.message}
                    </h3>
                    
                    <button
                      onClick={limpiarFormulario}
                      className={`mt-4 font-medium cursor-pointer ${
                        resultadoConsulta.success 
                          ? 'text-[var(--nav-dark)] hover:text-(--cta-blue)' 
                          : 'text-red-600 hover:text-red-700'
                      }`}
                    >
                      {resultadoConsulta.success ? 'Enviar otra consulta' : 'Intentar nuevamente'}
                    </button>
                  </div>
                )}
              </div>

              {/* Imagen lateral */}
              <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-[var(--cta-blue)] rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--nav-dark)] mb-4">
                    Estamos aquí para ayudarte
                  </h3>
                  <p className="text-gray-600">
                    Nuestro equipo responderá tu consulta lo antes posible. 
                    ¡Gracias por contactarte con Aurora Hotel!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
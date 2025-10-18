import { useState } from "react";
import SelectorHabReserva from "../components/Reservar/SelectorHabReserva";
import { crearReserva, type ReservaData } from "../api/reservar";

export default function Reservar() {
  const [cardFlip, setCardFlip] = useState(false);
  const [tipoHabitacionId, setTipoHabitacionId] = useState<number | null>(null);
  const [cardData, setCardData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fecha_inicio: "",
    fecha_fin: "",
    observaciones: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que se haya seleccionado un tipo de habitación
    if (!tipoHabitacionId) {
      alert("Por favor selecciona un tipo de habitación");
      return;
    }

    const reservaData: ReservaData = {
      // datos de persona
      nombre: cardData.nombre,
      apellido: cardData.apellido,
      email: cardData.email,
      telefono: cardData.telefono,
      // datos de reserva
      tipo_habitacion_id: tipoHabitacionId,
      fecha_inicio: cardData.fecha_inicio,
      fecha_fin: cardData.fecha_fin,
      observaciones: cardData.observaciones,
      // datos de pago
      cardName: cardData.cardName,
      cardNumber: cardData.cardNumber,
      cvc: cardData.cvc,
      expiry: cardData.expiry
    };

    const result = await crearReserva(reservaData);

    if (result.success && result.data) {
      // Reserva creada exitosamente
      alert(`¡Reserva creada exitosamente! 
      
Detalles:
• Reserva ID: ${result.data.reservaId}
• Habitación: ${result.data.habitacion.nombre} (${result.data.habitacion.tipo})
• Fechas: ${result.data.fechas.inicio} al ${result.data.fechas.fin}
• Estado: ${result.data.estado}

${result.message}`);
      
      // Limpiar formulario después de éxito
      setCardData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        fecha_inicio: "",
        fecha_fin: "",
        observaciones: "",
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvc: ""
      });
      setTipoHabitacionId(null);
    } else {
      // Error del backend o de conexión
      alert(`Error al crear la reserva: ${result.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-35 pb-20 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* ---- Formulario ---- */}
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <h2 className="text-3xl font-bold text-(--nav-dark) mb-6">
              Reservar Habitación
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={cardData.nombre}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={cardData.apellido}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={cardData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={cardData.telefono}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
              required
            />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Habitación *
                </label>
                <div className="w-full">
                  <SelectorHabReserva onChange={setTipoHabitacionId} />
                </div>
              </div>
              <input
                type="text"
                name="observaciones"
                placeholder="Observaciones (opcional)"
                value={cardData.observaciones}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col text-sm">
                Fecha inicio
                <input
                  type="date"
                  name="fecha_inicio"
                  value={cardData.fecha_inicio}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full"
                  required
                />
              </label>
              <label className="flex flex-col text-sm">
                Fecha fin
                <input
                  type="date"
                  name="fecha_fin"
                  value={cardData.fecha_fin}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full"
                  required
                />
              </label>
            </div>

            {/* ---- Datos de Tarjeta ---- */}
            <h3 className="text-xl font-semibold text-(--nav-dark) mt-6 mb-2">
              Datos de Tarjeta
            </h3>

            <div
              className="relative w-full h-48 perspective"
              onMouseEnter={() => setCardFlip(true)}
              onMouseLeave={() => setCardFlip(false)}
            >
              <div
                className={`absolute w-full h-full transition-transform duration-500 transform ${
                  cardFlip ? "rotate-y-180" : ""
                }`}
              >
                {/* Frente de tarjeta */}
                <div className="absolute w-full h-full bg-gradient-to-r from-[var(--nav-dark)] to-[#374151] text-white rounded-xl p-6 backface-hidden">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">AURORA HOTEL</span>
                    <span className="text-xs">VISA</span>
                  </div>
                  <div className="mt-8 text-xl tracking-widest">
                    {cardData.cardNumber || "#### #### #### ####"}
                  </div>
                  <div className="mt-6 flex justify-between text-sm">
                    <div>
                      <p className="opacity-70">Titular</p>
                      <p>{cardData.cardName || "NOMBRE DEL TITULAR"}</p>
                    </div>
                    <div>
                      <p className="opacity-70">Vence</p>
                      <p>{cardData.expiry || "MM/AA"}</p>
                    </div>
                  </div>
                </div>

                {/* Dorso */}
                <div className="absolute w-full h-full bg-gray-800 text-white rounded-xl p-6 rotate-y-180 backface-hidden">
                  <div className="bg-gray-700 h-10 mb-6"></div>
                  <div className="flex justify-end">
                    <div className="bg-white text-black px-3 py-1 rounded">
                      {cardData.cvc || "•••"}
                    </div>
                  </div>
                  <p className="text-xs mt-8 text-center opacity-60">
                    Tarjeta simulada solo con fines visuales
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                name="cardNumber"
                placeholder="Número de tarjeta"
                value={cardData.cardNumber}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                maxLength={19}
                required
              />
              <input
                type="text"
                name="cardName"
                placeholder="Nombre en la tarjeta"
                value={cardData.cardName}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiry"
                placeholder="MM/AA"
                value={cardData.expiry}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                required
              />
              <input
                type="text"
                name="cvc"
                placeholder="CVC"
                value={cardData.cvc}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full"
                maxLength={4}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-(--nav-dark) text-white font-semibold py-3 rounded-lg mt-6 hover:bg-[#374151] transition-all cursor-pointer"
            >
              Confirmar Reserva
            </button>
          </form>

          {/* ---- Imagen lateral ---- */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-200">
            <img
              src="/hero-2.jpg"
              alt="Habitación"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

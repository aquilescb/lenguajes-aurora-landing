export default function SomosAurora() {
  return (
    <section className="bg-[#111827] text-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto" id="somos-aurora">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12">
          Somos Aurora
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-gray-300 space-y-6 text-justify">
            <p>
              Entre paisajes que invitan a detener el tiempo y calles que respiran historia,
              Aurora nace como un refugio donde cada detalle está pensado para enamorar tus sentidos.
            </p>

            <p>
              Estamos ubicados en un lugar privilegiado, rodeados de naturaleza y cultura,
              donde las mañanas se iluminan con la calidez del sol y las noches se visten de calma.
            </p>

            <p>
              Aquí, la hospitalidad se convierte en arte y cada estadía es una experiencia única,
              tan suave y memorable como el primer sorbo de un vino bien guardado.
            </p>

            <a href="/reservar" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded transition cursor-pointer">
              Reservar
            </a>
          </div>

          <div className="flex-1">
            <img
              src="/hero-3.jpg"
              alt="Aurora Hotel"
              className="w-full h-auto rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

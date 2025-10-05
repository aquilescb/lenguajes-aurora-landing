import SelectorHab from "./SelectorHab";

export default function Disponibilidad() {
  return (
    <section className="bg-white min-h-screen flex flex-col items-center justify-start py-20 px-4">
      <div className="max-w-4xl w-full text-center text-white">
        <h1 className="text-5xl text-[#111827] font-semibold mb-10">Disponibilidad</h1>
        <SelectorHab />
      </div>
    </section>
  );
}

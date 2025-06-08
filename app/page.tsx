export default function Home() {
  return (
    <section className="text-center py-10">
      <h1 className="text-4xl font-bold mb-6 text-green-900">
        Bem-vindo ao Recomeçar+
      </h1>
      <p className="text-lg text-green-900 mb-6">
        Reconstruindo vidas, conectando solidariedade.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/pages/solicitar-ajuda"
          className="bg-yellow-400 text-green-900 px-6 py-3 rounded font-semibold shadow hover:bg-yellow-300 transition"
        >
          Solicite Ajuda
        </a>
        <a
          href="/pages/oferecer-ajuda"
          className="bg-yellow-400 text-green-900 px-6 py-3 rounded font-semibold shadow hover:bg-yellow-300 transition"
        >
          Ofereça Ajuda
        </a>
      </div>
    </section>
  );
}

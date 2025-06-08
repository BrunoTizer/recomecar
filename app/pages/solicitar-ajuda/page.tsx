export default function SolicitarAjudaPage() {
  return (
    <section className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-green-900">Solicite Ajuda</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome"
          className="border border-yellow-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          className="border border-yellow-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          className="border border-yellow-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <textarea
          placeholder="Necessidades Essenciais"
          className="border border-yellow-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          rows={3}
        />
        <button
          type="submit"
          className="bg-yellow-400 text-green-900 font-bold rounded py-2 mt-2 hover:bg-yellow-300 transition"
        >
          Confirmar Pedido
        </button>
      </form>
    </section>
  );
}

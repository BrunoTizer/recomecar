export default function HistoricoPage() {
  return (
    <section className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-6 text-green-900">
        Histórico de Contribuições
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Nome"
          className="border border-yellow-200 rounded px-4 py-2 flex-1"
        />
        <input
          type="date"
          placeholder="Data"
          className="border border-yellow-200 rounded px-4 py-2 flex-1"
        />
        <input
          type="text"
          placeholder="Categoria"
          className="border border-yellow-200 rounded px-4 py-2 flex-1"
        />
        <button
          type="submit"
          className="bg-green-900 text-white font-bold rounded px-4 py-2 hover:bg-green-800 transition"
        >
          Pesquisar
        </button>
      </form>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Status</th>
            <th className="py-2">Nome</th>
            <th className="py-2">Data</th>
            <th className="py-2">Categoria</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">
              <span className="bg-yellow-300 px-2 rounded text-green-900">
                Em andamento
              </span>
            </td>
            <td className="py-2">Fernando</td>
            <td className="py-2">23 abr. 2024</td>
            <td className="py-2">Transporte</td>
          </tr>
          <tr>
            <td className="py-2">
              <span className="bg-green-200 px-2 rounded text-green-900">
                Concluída
              </span>
            </td>
            <td className="py-2">Isabela</td>
            <td className="py-2">22 abr. 2024</td>
            <td className="py-2">Alimentos</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

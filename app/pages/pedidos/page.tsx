export default function PedidosPage() {
  return (
    <section className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-6 text-green-900">
        Pedidos de Ajuda
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nome, categoria ou prioridade"
          className="border border-yellow-200 rounded px-4 py-2 w-full"
        />
      </div>
      <ul className="space-y-4">
        <li className="border border-yellow-200 rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-green-900">
              Preciso de carona
            </h2>
            <p className="text-sm text-green-800">Para o hospital amanhã</p>
            <span className="inline-block mt-1 text-xs bg-red-200 text-red-800 rounded px-2">
              Urgente
            </span>
          </div>
          <button className="mt-3 sm:mt-0 bg-green-900 text-white font-bold px-4 py-2 rounded hover:bg-green-800 transition">
            Quero ajudar
          </button>
        </li>
        <li className="border border-yellow-200 rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-green-900">
              Necessito de alimentos
            </h2>
            <p className="text-sm text-green-800">
              Cestas básicas para família
            </p>
            <span className="inline-block mt-1 text-xs bg-yellow-200 text-yellow-900 rounded px-2">
              Média prioridade
            </span>
          </div>
          <button className="mt-3 sm:mt-0 bg-green-900 text-white font-bold px-4 py-2 rounded hover:bg-green-800 transition">
            Quero ajudar
          </button>
        </li>
      </ul>
    </section>
  );
}

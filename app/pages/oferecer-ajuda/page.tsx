export default function OferecerAjudaPage() {
  return (
    <section className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-6 text-green-900">Ofereça Ajuda</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button className="bg-yellow-300 hover:bg-yellow-400 text-green-900 font-bold rounded flex flex-col items-center py-6 transition">
          <span className="text-4xl mb-2">👜</span>
          Doação de Alimentos
        </button>
        <button className="bg-yellow-300 hover:bg-yellow-400 text-green-900 font-bold rounded flex flex-col items-center py-6 transition">
          <span className="text-4xl mb-2">🏠</span>
          Hospedagem Temporária
        </button>
        <button className="bg-yellow-300 hover:bg-yellow-400 text-green-900 font-bold rounded flex flex-col items-center py-6 transition">
          <span className="text-4xl mb-2">🚗</span>
          Transporte
        </button>
        <button className="bg-yellow-300 hover:bg-yellow-400 text-green-900 font-bold rounded flex flex-col items-center py-6 transition">
          <span className="text-4xl mb-2">👕</span>
          Roupas
        </button>
      </div>
    </section>
  );
}

export default function CadastroPage() {
  return (
    <section className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-green-900">Cadastro</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome"
          className="border border-yellow-200 rounded px-4 py-2"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          className="border border-yellow-200 rounded px-4 py-2"
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          className="border border-yellow-200 rounded px-4 py-2"
        />
        <input
          type="password"
          placeholder="Senha"
          className="border border-yellow-200 rounded px-4 py-2"
          required
        />
        <select className="border border-yellow-200 rounded px-4 py-2" required>
          <option value="">Eu quero...</option>
          <option value="victima">Receber ajuda</option>
          <option value="voluntario">Oferecer ajuda</option>
        </select>
        <button
          type="submit"
          className="bg-yellow-400 text-green-900 font-bold rounded py-2 mt-2 hover:bg-yellow-300 transition"
        >
          Cadastrar
        </button>
      </form>
    </section>
  );
}

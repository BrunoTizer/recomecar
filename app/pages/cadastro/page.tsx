"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState(""); // novo campo
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setSucesso("");

    try {
      const res = await fetch(
        "https://recomecar-restfulapi.onrender.com/usuarios",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha, telefone, tipo }),
        }
      );

      if (!res.ok) {
        const errorMsg = await res.text();
        setErro(errorMsg || "Erro ao cadastrar usuário.");
        setLoading(false);
        return;
      }

      setSucesso("Cadastro realizado com sucesso! Você já pode fazer login.");
      setTimeout(() => {
        router.push("/pages/login");
      }, 1800);
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <section className="max-w-sm mx-auto bg-white rounded-xl shadow p-6 mt-12">
      <h1 className="text-2xl font-bold mb-6 text-green-900 text-center">
        Cadastro
      </h1>
      <form onSubmit={handleCadastro} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome"
          className="border rounded px-3 py-2"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          className="border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="border rounded px-3 py-2"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          className="border rounded px-3 py-2"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <select
          className="border rounded px-3 py-2"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="">Selecione o tipo de usuário</option>
          <option value="vitima">Quero receber ajuda</option>
          <option value="voluntario">Quero oferecer ajuda</option>
        </select>
        <button
          type="submit"
          className="bg-green-900 text-white rounded py-2 font-bold hover:bg-green-800 transition"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        {erro && <div className="text-red-600 text-sm text-center">{erro}</div>}
        {sucesso && (
          <div className="text-green-800 text-sm text-center">{sucesso}</div>
        )}
      </form>
      <div className="mt-4 text-center">
        <a href="/pages/login" className="text-green-900 underline">
          Já tem conta? Entrar
        </a>
      </div>
    </section>
  );
}

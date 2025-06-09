"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Campo, Select } from "@/app/components";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [tipo, setTipo] = useState<"" | "vitima" | "voluntario">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string>("");
  const [sucesso, setSucesso] = useState<string>("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");
    setSucesso("");

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, telefone, tipo }),
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        setErro(errorMsg || "Erro ao cadastrar usuário.");
        setLoading(false);
        return;
      }

      setSucesso("Cadastro realizado com sucesso! Agora Você já pode fazer login.");
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
        <Campo
          label="Nome"
          id="nome"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <Campo
          label="E-mail"
          id="email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Campo
          label="Senha"
          id="senha"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <Campo
          label="Telefone"
          id="telefone"
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <Select
          value={tipo}
          onChange={(e) =>
            setTipo(e.target.value as "" | "vitima" | "voluntario")
          }
          required
        >
          <option value="">Selecione o tipo de usuário</option>
          <option value="vitima">Quero receber ajuda</option>
          <option value="voluntario">Quero oferecer ajuda</option>
        </Select>
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

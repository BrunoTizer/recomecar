"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Campo from "@/app/components/Campo";
import { Usuario } from "@/app/types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const res = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        setErro(errorMsg || "Falha ao autenticar. Verifique os dados.");
        setLoading(false);
        return;
      }

      const user: Usuario = await res.json();
      localStorage.setItem("usuario", JSON.stringify(user));
      if (user.tipo === "vitima") {
        router.replace("/pages/solicitar-ajuda");
      } else if (user.tipo === "voluntario") {
        router.replace("/pages/oferecer-ajuda");
      } else {
        router.replace("/");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErro("Erro de conexão. " + err.message);
      } else {
        setErro("Erro de conexão. Tente novamente.");
      }
    }

    setLoading(false);
  };

  return (
    <section className="max-w-sm mx-auto bg-white rounded-xl shadow p-6 mt-12">
      <h1 className="text-2xl font-bold mb-6 text-green-900 text-center">
        Entrar
      </h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Campo
          label="E-mail"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Campo
          label="Senha"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-900 text-white rounded py-2 font-bold hover:bg-green-800 transition"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        {erro && <div className="text-red-600 text-sm text-center">{erro}</div>}
      </form>
      <div className="mt-4 text-center">
        <a href="/pages/cadastro" className="text-green-900 underline">
          Não tem conta? Cadastre-se
        </a>
      </div>
    </section>
  );
}

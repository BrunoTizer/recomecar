"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Categoria } from "@/app/types";
import { Botao, Select } from "@/app/components";

export default function OferecerAjudaPage() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<
    { value: number; label: string }[]
  >([]);
  const [categoriaId, setCategoriaId] = useState<number | "">("");
  const [descricao, setDescricao] = useState("");
  const [statusPedidoId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/categorias")
      .then((res) => res.json())
      .then((data: Categoria[]) => {
        setCategorias(
          Array.isArray(data)
            ? (data
                .map((c) => {
                  const value = c.idCategoria ?? c.id_categoria;
                  if (typeof value !== "number") return null;
                  return { value, label: c.nome };
                })
                .filter(Boolean) as { value: number; label: string }[])
            : []
        );
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario") || "{}");
    if (user?.idUsuario) {
      setUsuarioId(user.idUsuario);
      setCheckingLogin(false);
    } else {
      router.replace("/pages/login");
    }
  }, [router]);

  useEffect(() => {
    setErro("");
    setSucesso("");
  }, [categoriaId, descricao]);

  if (checkingLogin) {
    return <div className="text-center">Carregando...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/ofertas-ajuda",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuarioId,
            categoriaId: Number(categoriaId),
            descricao,
            statusPedidoId,
          }),
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        setErro(msg || "Erro ao enviar oferta.");
        setLoading(false);
        return;
      }

      setSucesso("Oferta de ajuda enviada com sucesso!");
      setDescricao("");
      setCategoriaId("");
      setTimeout(() => {
        router.push("/pages/historico");
      }, 2000);
    } catch {
      setErro("Erro de conexão.");
    }
    setLoading(false);
  };

  return (
    <section className="max-w-md mx-auto bg-white rounded-xl shadow p-6 mt-12">
      <h1 className="text-2xl font-bold mb-6 text-green-900 text-center">
        Oferecer Ajuda
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Select
          value={categoriaId}
          onChange={(e) => setCategoriaId(Number(e.target.value))}
          required
        >
          <option value="">Selecione a categoria</option>
          {categorias.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </Select>
        <textarea
          placeholder="Descreva como você pode ajudar"
          className="border rounded px-3 py-2 min-h-[80px]"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <Botao type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Solicitar ajuda"}
        </Botao>
        {erro && <div className="text-red-600 text-sm text-center">{erro}</div>}
        {sucesso && (
          <div className="text-green-800 text-sm text-center">{sucesso}</div>
        )}
      </form>
    </section>
  );
}

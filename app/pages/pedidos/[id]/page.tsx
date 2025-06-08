"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { OfertaAjuda, PedidoAjuda } from "@/app/types";

export default function PedidoDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [pedido, setPedido] = useState<PedidoAjuda | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    async function fetchPedido() {
      try {
        const res = await fetch(`http://localhost:8080/pedidos-ajuda/${id}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setPedido(data);
      } catch (err) {
        if (err instanceof Error) {
          setErro(err.message || "Erro ao carregar pedido.");
        } else {
          setErro("Erro ao carregar pedido.");
        }
      }
      setLoading(false);
    }
    fetchPedido();
  }, [id]);

  async function handleQueroAjudar() {
    setBtnLoading(true);
    setSucesso("");
    setErro("");
    try {
      const user = JSON.parse(localStorage.getItem("usuario") || "{}");
      const usuarioId = user.idUsuario;
      if (!usuarioId) throw new Error("Usuário não encontrado.");

      const ofertasRes = await fetch("http://localhost:8080/ofertas-ajuda");
      if (!ofertasRes.ok) throw new Error("Erro ao buscar ofertas.");
      const ofertas = (await ofertasRes.json()) as OfertaAjuda[];
      const minhas = ofertas.filter((o) => o.usuarioId === usuarioId);
      if (minhas.length === 0)
        throw new Error("Cadastre uma oferta de ajuda primeiro!");
      const ultimaOferta = minhas[minhas.length - 1];

      const res = await fetch("http://localhost:8080/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ofertaAjudaId: ultimaOferta.id,
          pedidoAjudaId: pedido!.id,
          statusMatchId: 1,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSucesso("Match criado com sucesso! Entraremos em contato.");
      setTimeout(() => router.push("/pages/historico"), 2000);
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message || "Erro ao criar match.");
      } else {
        setErro("Erro ao criar match.");
      }
    }
    setBtnLoading(false);
  }

  if (loading) {
    return <div className="text-center mt-16">Carregando detalhes...</div>;
  }

  if (erro) {
    return <div className="text-center text-red-600 mt-16">{erro}</div>;
  }

  if (!pedido) {
    return <div className="text-center mt-16">Pedido não encontrado.</div>;
  }

  return (
    <section className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-green-900">
        {pedido.descricao}
      </h1>
      <ul className="mb-4 text-sm text-green-800">{/* ...seus campos... */}</ul>
      <button
        className="bg-green-900 text-white font-bold rounded py-2 w-full hover:bg-green-800 transition mb-2"
        onClick={handleQueroAjudar}
        disabled={btnLoading}
      >
        {btnLoading ? "Processando..." : "Quero ajudar"}
      </button>
      {sucesso && <div className="text-green-800 text-center">{sucesso}</div>}
      {erro && <div className="text-red-600 text-center">{erro}</div>}
      <button
        className="mt-2 bg-gray-300 text-green-900 font-bold rounded py-2 w-full hover:bg-gray-200 transition"
        onClick={() => router.push("/pages/pedidos")}
      >
        Voltar à lista
      </button>
    </section>
  );
}

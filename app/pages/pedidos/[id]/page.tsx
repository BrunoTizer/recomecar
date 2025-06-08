"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PedidoDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [pedido, setPedido] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchPedido() {
      try {
        const res = await fetch(
          `https://recomecar-restfulapi.onrender.com/pedidos-ajuda/${id}`
        );
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setPedido(data);
      } catch (err: any) {
        setErro(err.message || "Erro ao carregar pedido.");
      }
      setLoading(false);
    }
    fetchPedido();
  }, [id]);

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
      <ul className="mb-4 text-sm text-green-800">
        <li>
          <span className="font-bold">ID:</span>{" "}
          {pedido.id || pedido.id_pedido_ajuda}
        </li>
        <li>
          <span className="font-bold">Categoria:</span>{" "}
          {pedido.categoriaId || pedido.categoria_id}
        </li>
        <li>
          <span className="font-bold">Prioridade:</span>{" "}
          <span
            className={`inline-block px-2 rounded ${
              pedido.prioridade === 3
                ? "bg-red-200 text-red-800"
                : pedido.prioridade === 2
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {pedido.prioridade === 3
              ? "Urgente"
              : pedido.prioridade === 2
              ? "Média"
              : "Baixa"}
          </span>
        </li>
        <li>
          <span className="font-bold">Solicitante:</span>{" "}
          {pedido.usuarioId || pedido.usuario_id}
        </li>
        <li>
          <span className="font-bold">Data:</span>{" "}
          {pedido.dataPedido || pedido.dt_pedido}
        </li>
        <li>
          <span className="font-bold">Status:</span>{" "}
          {pedido.statusPedidoId || pedido.status_pedido_id}
        </li>
      </ul>
      {/* Aqui pode entrar o botão "Quero ajudar" */}
      <button
        className="bg-green-900 text-white font-bold rounded py-2 w-full hover:bg-green-800 transition"
        onClick={() => router.push("/pedidos")}
      >
        Voltar à lista
      </button>
    </section>
  );
}

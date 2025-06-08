"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PedidoDetalhePage() {
  const params = useParams<{ id: string }>(); // 👈 pegando o id da rota
  const router = useRouter(); // 👈 para navegacao programatica
  const [pedidoId, setPedidoId] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      setPedidoId(params.id);
    }
  }, [params.id]);

  if (!pedidoId) return <div>Carregando...</div>;

  const pedido = {
    id: pedidoId,
    titulo: "Preciso de carona",
    descricao: "Preciso de carona para o hospital amanhã.",
    status: "Urgente",
    nome: "João Silva",
    data: "08/06/2024",
    categoria: "Transporte",
  };

  return (
    <section className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-green-900">
        {pedido.titulo}
      </h1>
      <p className="mb-2 text-green-900">{pedido.descricao}</p>
      <ul className="mb-4 text-sm text-green-800">
        <li>
          <span className="font-bold">ID:</span> {pedido.id}
        </li>
        <li>
          <span className="font-bold">Categoria:</span> {pedido.categoria}
        </li>
        <li>
          <span className="font-bold">Status:</span>
          <span className="inline-block bg-red-200 text-red-800 rounded px-2 ml-1">
            {pedido.status}
          </span>
        </li>
        <li>
          <span className="font-bold">Solicitante:</span> {pedido.nome}
        </li>
        <li>
          <span className="font-bold">Data:</span> {pedido.data}
        </li>
      </ul>
      <button
        className="bg-green-900 text-white font-bold rounded py-2 w-full hover:bg-green-800 transition"
        onClick={() => router.push("pages/pedidos")}
      >
        Voltar à lista
      </button>
    </section>
  );
}

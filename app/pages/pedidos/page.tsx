"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PedidoAjuda } from "@/app/types";

export default function PedidosPage() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<PedidoAjuda[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch("http://localhost:8080/pedidos-ajuda");
        if (!res.ok) throw new Error(await res.text());
        const data: PedidoAjuda[] = await res.json();
        setPedidos(data);
      } catch (err) {
        if (err instanceof Error) {
          setErro(err.message || "Erro ao buscar pedidos.");
        } else {
          setErro("Erro ao buscar pedidos.");
        }
      }
      setLoading(false);
    };
    fetchPedidos();
  }, []);

  if (loading) {
    return <div className="text-center mt-16">Carregando pedidos...</div>;
  }

  if (erro) {
    return <div className="text-center text-red-600 mt-16">{erro}</div>;
  }

  if (!pedidos.length) {
    return <div className="text-center mt-16">Nenhum pedido encontrado.</div>;
  }

  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-green-900 mb-6 text-center">
        Pedidos de Ajuda
      </h1>
      <div className="grid gap-5">
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-lg transition cursor-pointer"
            onClick={() => router.push(`/pages/pedidos/${pedido.id}`)}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-green-900">
                {pedido.descricao}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs ${
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
            </div>
            <div className="text-sm text-green-800">
              Categoria: {pedido.categoriaId}
            </div>
            <div className="text-sm text-gray-500">
              Data: {pedido.dataPedido || "N/A"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

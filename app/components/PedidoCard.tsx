import React from "react";
import { PedidoAjuda } from "@/app/types";

interface PedidoCardProps {
  pedido: PedidoAjuda;
  onClick?: () => void;
}

export default function PedidoCard({ pedido, onClick }: PedidoCardProps) {
  return (
    <div
      className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
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
  );
}

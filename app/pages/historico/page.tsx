"use client";
import { useState, useEffect } from "react";
import {
  Categoria,
  HistoricoTabelaProps,
  OfertaAjuda,
  PedidoAjuda,
  StatusPedido,
} from "../../types";

const ENDPOINT_STATUS = "http://localhost:8080/status-pedido";

export default function HistoricoPage() {
  const [tab, setTab] = useState<"solicitacoes" | "contribuicoes">(
    "solicitacoes"
  );
  const [categorias, setCategorias] = useState<Record<number, string>>({});
  const [statusPedido, setStatusPedido] = useState<Record<number, string>>({});

  useEffect(() => {
    fetch("http://localhost:8080/categorias")
      .then((res) => res.json())
      .then((lista: Categoria[]) => {
        const map: Record<number, string> = {};
        lista.forEach((c) => {
          const id = c.idCategoria ?? c.id_categoria;
          if (typeof id === "number") map[id] = c.nome;
        });
        setCategorias(map);
      });
  }, []);

  useEffect(() => {
    fetch(ENDPOINT_STATUS)
      .then((res) => res.json())
      .then((lista: StatusPedido[]) => {
        const map: Record<number, string> = {};
        lista.forEach((s) => {
          const id = s.idStatus ?? s.id_status;
          if (typeof id === "number") map[id] = s.nome;
        });
        setStatusPedido(map);
      });
  }, []);

  function formatarData(data: string) {
    const d = new Date(data);
    d.setHours(d.getHours() + 3);
    return d.toLocaleDateString("pt-BR");
  }

  return (
    <section className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-6 text-green-900">Histórico</h1>
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 rounded-l ${
            tab === "solicitacoes"
              ? "bg-yellow-300 text-green-900 font-bold"
              : "bg-gray-100"
          }`}
          onClick={() => setTab("solicitacoes")}
        >
          Minhas Solicitações
        </button>
        <button
          className={`flex-1 py-2 rounded-r ${
            tab === "contribuicoes"
              ? "bg-yellow-300 text-green-900 font-bold"
              : "bg-gray-100"
          }`}
          onClick={() => setTab("contribuicoes")}
        >
          Minhas Contribuições
        </button>
      </div>
      {tab === "solicitacoes" ? (
        <Solicitacoes
          formatarData={formatarData}
          categorias={categorias}
          statusPedido={statusPedido}
        />
      ) : (
        <Contribuicoes
          formatarData={formatarData}
          categorias={categorias}
          statusPedido={statusPedido}
        />
      )}
    </section>
  );
}

function Solicitacoes({
  formatarData,
  categorias,
  statusPedido,
}: HistoricoTabelaProps) {
  const [dados, setDados] = useState<PedidoAjuda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario") || "{}");
    const usuarioId = user.idUsuario;
    if (!usuarioId) return;

    fetch(`http://localhost:8080/pedidos-ajuda`)
      .then((res) => res.json())
      .then((lista) => {
        setDados(
          Array.isArray(lista)
            ? lista.filter((p) => p.usuarioId === usuarioId)
            : []
        );
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="py-2">Status</th>
          <th className="py-2">Descrição</th>
          <th className="py-2">Data</th>
          <th className="py-2">Categoria</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((p) => (
          <tr key={p.id}>
            <td className="py-2">
              <span className="bg-yellow-300 px-2 rounded text-green-900">
                {statusPedido[p.statusPedidoId]}
              </span>
            </td>
            <td className="py-2">{p.descricao}</td>
            <td className="py-2">
              {p.dataPedido ? formatarData(p.dataPedido) : "--"}
            </td>
            <td className="py-2">{categorias[p.categoriaId]}</td>
          </tr>
        ))}
        {dados.length === 0 && (
          <tr>
            <td colSpan={4} className="text-center py-4 text-green-900">
              Nenhuma solicitação encontrada.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function Contribuicoes({
  formatarData,
  categorias,
  statusPedido,
}: HistoricoTabelaProps) {
  const [dados, setDados] = useState<OfertaAjuda[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario") || "{}");
    const usuarioId = user.idUsuario;
    if (!usuarioId) return;

    fetch(`http://localhost:8080/ofertas-ajuda`)
      .then((res) => res.json())
      .then((lista) => {
        setDados(
          Array.isArray(lista)
            ? lista.filter((o) => o.usuarioId === usuarioId)
            : []
        );
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <table className="w-full text-left">
      <thead>
        <tr>
          <th className="py-2">Status</th>
          <th className="py-2">Descrição</th>
          <th className="py-2">Data</th>
          <th className="py-2">Categoria</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((o) => (
          <tr key={o.id}>
            <td className="py-2">
              <span className="bg-green-200 px-2 rounded text-green-900">
                {statusPedido[o.statusPedidoId]}
              </span>
            </td>
            <td className="py-2">{o.descricao}</td>
            <td className="py-2">
              {o.dataOferta ? formatarData(o.dataOferta) : "--"}
            </td>
            <td className="py-2">{categorias[o.categoriaId]}</td>
          </tr>
        ))}
        {dados.length === 0 && (
          <tr>
            <td colSpan={4} className="text-center py-4 text-green-900">
              Nenhuma contribuição encontrada.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

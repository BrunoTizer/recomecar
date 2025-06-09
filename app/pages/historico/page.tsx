"use client";
import { useState, useEffect } from "react";
import {
  Categoria,
  HistoricoTabelaProps,
  OfertaAjuda,
  PedidoAjuda,
  StatusPedido,
} from "../../types";
import { useRouter } from "next/navigation";

const ENDPOINT_STATUS = "http://localhost:8080/status-pedido";

export default function HistoricoPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"solicitacoes" | "contribuicoes">(
    "solicitacoes"
  );
  const [categorias, setCategorias] = useState<Record<number, string>>({});
  const [statusPedido, setStatusPedido] = useState<Record<number, string>>({});
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario") || "{}");
    if (user?.idUsuario) {
      setCheckingLogin(false);
    } else {
      router.replace("/pages/login");
    }
  }, [router]);

  useEffect(() => {
    if (checkingLogin) return;
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
  }, [checkingLogin]);

  useEffect(() => {
    if (checkingLogin) return;
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
  }, [checkingLogin]);

  function formatarData(data: string) {
    const d = new Date(data);
    d.setHours(d.getHours() + 3);
    return d.toLocaleDateString("pt-BR");
  }

  if (checkingLogin) {
    return <div className="text-center mt-12">Carregando...</div>;
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
          aria-pressed={tab === "solicitacoes"}
          aria-label="Ver minhas solicitações"
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
          aria-pressed={tab === "contribuicoes"}
          aria-label="Ver minhas contribuições"
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
      .then((lista: PedidoAjuda[]) => {
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
    <>
      <table className="w-full text-left hidden md:table">
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
        </tbody>
      </table>

      {/* Mobile: Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {dados.map((p) => (
          <div
            key={p.id}
            className="bg-gray-50 rounded-lg p-4 shadow flex flex-col gap-1"
          >
            <div>
              <span className="font-bold text-green-900">Status:</span>{" "}
              <span className="bg-yellow-300 px-2 rounded text-green-900">
                {statusPedido[p.statusPedidoId]}
              </span>
            </div>
            <div>
              <span className="font-bold text-green-900">Descrição:</span>{" "}
              {p.descricao}
            </div>
            <div>
              <span className="font-bold text-green-900">Data:</span>{" "}
              {p.dataPedido ? formatarData(p.dataPedido) : "--"}
            </div>
            <div>
              <span className="font-bold text-green-900">Categoria:</span>{" "}
              {categorias[p.categoriaId]}
            </div>
          </div>
        ))}
        {dados.length === 0 && (
          <div className="text-center py-4 text-green-900 bg-gray-50 rounded-lg">
            Nenhuma solicitação encontrada.
          </div>
        )}
      </div>
    </>
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
    <>
      {/* Desktop: Tabela */}
      <table className="w-full text-left hidden md:table">
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
        </tbody>
      </table>

      {/* Mobile: Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {dados.map((o) => (
          <div
            key={o.id}
            className="bg-green-50 rounded-lg p-4 shadow flex flex-col gap-1"
          >
            <div>
              <span className="font-bold text-green-900">Status:</span>{" "}
              <span className="bg-green-200 px-2 rounded text-green-900">
                {statusPedido[o.statusPedidoId]}
              </span>
            </div>
            <div>
              <span className="font-bold text-green-900">Descrição:</span>{" "}
              {o.descricao}
            </div>
            <div>
              <span className="font-bold text-green-900">Data:</span>{" "}
              {o.dataOferta ? formatarData(o.dataOferta) : "--"}
            </div>
            <div>
              <span className="font-bold text-green-900">Categoria:</span>{" "}
              {categorias[o.categoriaId]}
            </div>
          </div>
        ))}
        {dados.length === 0 && (
          <div className="text-center py-4 text-green-900 bg-green-50 rounded-lg">
            Nenhuma contribuição encontrada.
          </div>
        )}
      </div>
    </>
  );
}

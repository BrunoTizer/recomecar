"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Categoria, OfertaAjuda, PedidoAjuda, StatusPedido } from "@/app/types";
import { Feedback } from "@/app/components";

export default function PedidoDetalhePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { id } = params;

  const [pedido, setPedido] = useState<PedidoAjuda | null>(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [categorias, setCategorias] = useState<Record<number, string>>({});
  const [statusPedido, setStatusPedido] = useState<Record<number, string>>({});
  const [pedidoLoading, setPedidoLoading] = useState(true);
  const [categoriasLoading, setCategoriasLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(true);

  function getCategoriaId(
    c: Categoria | { id_categoria?: number }
  ): number | undefined {
    if ("idCategoria" in c && typeof c.idCategoria === "number")
      return c.idCategoria;
    if ("id_categoria" in c && typeof c.id_categoria === "number")
      return c.id_categoria;
    return undefined;
  }

  function getStatusId(
    s: StatusPedido | { id_status?: number }
  ): number | undefined {
    if ("idStatus" in s && typeof s.idStatus === "number") return s.idStatus;
    if ("id_status" in s && typeof s.id_status === "number") return s.id_status;
    return undefined;
  }

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/categorias")
      .then((res) => res.json())
      .then((lista: Categoria[]) => {
        const map: Record<number, string> = {};
        lista.forEach((c) => {
          const id = getCategoriaId(c);
          if (typeof id === "number") map[id] = c.nome;
        });
        setCategorias(map);
      })
      .finally(() => setCategoriasLoading(false));

    fetch(process.env.NEXT_PUBLIC_API_URL + "/status-pedido")
      .then((res) => res.json())
      .then((lista: StatusPedido[]) => {
        const map: Record<number, string> = {};
        lista.forEach((s: StatusPedido) => {
          const id = getStatusId(s);
          if (typeof id === "number") map[id] = s.nome;
        });
        setStatusPedido(map);
      })
      .finally(() => setStatusLoading(false));
  }, []);

  useEffect(() => {
    async function fetchPedido() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pedidos-ajuda/${id}`
        );
        if (!res.ok) throw new Error(await res.text());
        const data: PedidoAjuda = await res.json();
        setPedido(data);
      } catch (err) {
        if (err instanceof Error) {
          setErro(err.message || "Erro ao carregar pedido.");
        } else {
          setErro("Erro ao carregar pedido.");
        }
      }
      setPedidoLoading(false);
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

      const ofertasRes = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/ofertas-ajuda"
      );
      if (!ofertasRes.ok) throw new Error("Erro ao buscar ofertas.");
      const ofertas = (await ofertasRes.json()) as OfertaAjuda[];
      const minhas = ofertas.filter((o) => o.usuarioId === usuarioId);
      if (minhas.length === 0)
        throw new Error("Cadastre uma oferta de ajuda primeiro!");
      const ultimaOferta = minhas[minhas.length - 1];

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/matches", {
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
  if (pedidoLoading || categoriasLoading || statusLoading) {
    return <Feedback>Carregando detalhes...</Feedback>;
  }
  if (erro) return <Feedback className="text-red-600">{erro}</Feedback>;
  if (!pedido)
    return <Feedback className="text-red-600">Pedido não encontrado</Feedback>;

  return (
    <section className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-green-900">
        {pedido.descricao}
      </h1>
      <ul className="mb-4 text-sm text-green-800">
        <li>
          <strong>Categoria:</strong>{" "}
          {categorias[pedido.categoriaId] || "Carregando..."}
        </li>
        <li>
          <strong>Prioridade:</strong>{" "}
          {pedido.prioridade === 3
            ? "Urgente"
            : pedido.prioridade === 2
            ? "Média"
            : "Baixa"}
        </li>
        <li>
          <strong>Status:</strong>{" "}
          {statusPedido[pedido.statusPedidoId] || "Carregando..."}
        </li>
        <li>
          <strong>Data:</strong> {pedido.dataPedido ?? "--"}
        </li>
      </ul>

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

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIAS = [
  { value: 1, label: "Doação de Alimentos" },
  { value: 2, label: "Hospedagem Temporária" },
  { value: 3, label: "Transporte" },
  { value: 4, label: "Roupas" },
];

export default function SolicitarAjudaPage() {
  const router = useRouter();
  const [categoriaId, setCategoriaId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("1");
  const [statusPedidoId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const user = JSON.parse(localStorage.getItem("usuario") || "{}");
  const usuarioId = user.idUsuario;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://recomecar-restfulapi.onrender.com/pedidos-ajuda",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuarioId,
            categoriaId: Number(categoriaId),
            descricao,
            prioridade: Number(prioridade),
            statusPedidoId,
          }),
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        setErro(msg || "Erro ao enviar pedido.");
        setLoading(false);
        return;
      }

      setSucesso("Pedido enviado com sucesso!");
      setDescricao("");
      setCategoriaId("");
      setPrioridade("1");
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
        Solicitar Ajuda
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          className="border rounded px-3 py-2"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
        >
          <option value="">Selecione a categoria</option>
          {CATEGORIAS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Descreva sua necessidade"
          className="border rounded px-3 py-2 min-h-[80px]"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <select
          className="border rounded px-3 py-2"
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
          required
        >
          <option value="1">Prioridade baixa</option>
          <option value="2">Média prioridade</option>
          <option value="3">Urgente</option>
        </select>
        <button
          type="submit"
          className="bg-green-900 text-white rounded py-2 font-bold hover:bg-green-800 transition"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Solicitar ajuda"}
        </button>
        {erro && <div className="text-red-600 text-sm text-center">{erro}</div>}
        {sucesso && (
          <div className="text-green-800 text-sm text-center">{sucesso}</div>
        )}
      </form>
    </section>
  );
}

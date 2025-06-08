"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SolicitarAjudaPage() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<
    { value: number; label: string }[]
  >([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("1");
  const [statusPedidoId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    fetch("https://recomecar-restfulapi.onrender.com/categorias")
      .then((res) => res.json())
      .then((data) => {
        setCategorias(
          Array.isArray(data)
            ? data.map((c: any) => ({
                value: c.idCategoria || c.id_categoria,
                label: c.nome,
              }))
            : []
        );
      });
  }, []);

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
          {categorias.map((c) => (
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

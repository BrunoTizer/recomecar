"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PedidoAjuda } from "@/app/types";
import { PedidoCard, Feedback } from "@/app/components";

export default function PedidosPage() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<PedidoAjuda[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

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
    const fetchPedidos = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/pedidos-ajuda"
        );
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
  }, [checkingLogin]);

  if (checkingLogin) return <Feedback>Carregando...</Feedback>;
  if (loading) return <Feedback>Carregando pedidos...</Feedback>;
  if (erro) return <Feedback className="text-red-600">{erro}</Feedback>;
  if (!pedidos.length) return <Feedback>Nenhum pedido encontrado.</Feedback>;

  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-green-900 mb-6 text-center">
        Pedidos de Ajuda
      </h1>
      <div className="grid gap-5">
        {pedidos.map((pedido) => (
          <PedidoCard
            key={pedido.id}
            pedido={pedido}
            onClick={() => router.push(`/pages/pedidos/${pedido.id}`)}
          />
        ))}
      </div>
    </section>
  );
}

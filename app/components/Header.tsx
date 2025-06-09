"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLogado(!!localStorage.getItem("usuario"));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("usuario"); // Limpa só o usuário
    setOpen(false);
    router.replace("/pages/login");
  }

  return (
    <header className="w-full bg-yellow-50 border-b border-yellow-200 mb-6">
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="text-2xl font-bold text-green-900 pl-4 py-4">
          Recomeçar<span className="text-yellow-500">+</span>
        </Link>
        <button
          className="md:hidden p-2 rounded hover:bg-yellow-100"
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="w-7 h-7 text-green-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}
            />
          </svg>
        </button>
        <nav className="hidden md:flex gap-8 pr-4 items-center">
          <Link
            href="/pages/solicitar-ajuda"
            className="text-green-900 font-medium hover:underline"
          >
            Solicite
          </Link>
          <Link
            href="/pages/oferecer-ajuda"
            className="text-green-900 font-medium hover:underline"
          >
            Ofereça
          </Link>
          <Link
            href="/pages/pedidos"
            className="text-green-900 font-medium hover:underline"
          >
            Pedidos
          </Link>
          <Link
            href="/pages/historico"
            className="text-green-900 font-medium hover:underline"
          >
            Histórico
          </Link>
          {logado && (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 bg-green-900 text-white rounded font-bold hover:bg-green-800 transition cursor-pointer"
              aria-label="Sair da conta"
              type="button"
            >
              Sair
            </button>
          )}
        </nav>
      </div>
      {/* Menu mobile */}
      {open && (
        <nav className="md:hidden flex flex-col gap-2 bg-yellow-50 px-4 pb-4 pt-2 rounded-b">
          <Link
            href="/pages/solicitar-ajuda"
            className="text-green-900 font-medium hover:underline"
            onClick={() => setOpen(false)}
          >
            Solicite
          </Link>
          <Link
            href="/pages/oferecer-ajuda"
            className="text-green-900 font-medium hover:underline"
            onClick={() => setOpen(false)}
          >
            Ofereça
          </Link>
          <Link
            href="/pages/pedidos"
            className="text-green-900 font-medium hover:underline"
            onClick={() => setOpen(false)}
          >
            Pedidos
          </Link>
          <Link
            href="/pages/historico"
            className="text-green-900 font-medium hover:underline"
            onClick={() => setOpen(false)}
          >
            Histórico
          </Link>
          {logado && (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 bg-green-900 text-white rounded font-bold hover:bg-green-800 transition cursor-pointer"
              aria-label="Sair da conta"
              type="button"
            >
              Sair
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

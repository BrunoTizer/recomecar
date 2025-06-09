"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-yellow-50 border-b border-yellow-200 mb-6">
      <div className="flex items-center justify-between w-full">
        {/* Logo à esquerda, SEM padding */}
        <Link
          href="/"
          className="text-2xl font-bold text-green-900 pl-4 py-4"
          style={{ marginRight: 0 }}
        >
          Recomeçar<span className="text-yellow-500">+</span>
        </Link>
        {/* Botão hamburger mobile */}
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
        {/* Menu desktop colado na direita */}
        <nav className="hidden md:flex gap-8 pr-4">
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
        </nav>
      )}
    </header>
  );
}

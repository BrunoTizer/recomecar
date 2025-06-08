import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-yellow-50 border-b border-yellow-200 mb-6">
      <Link href="/" className="text-2xl font-bold text-green-900">
        Recomeçar<span className="text-yellow-500">+</span>
      </Link>
      <nav className="flex gap-6">
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
          href="/pages/historico"
          className="text-green-900 font-medium hover:underline"
        >
          Histórico
        </Link>
      </nav>
    </header>
  );
}

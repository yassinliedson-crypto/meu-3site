"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";

const links = [
  { href: "/", label: "Início" },
  { href: "/galeria", label: "Galeria" },
  { href: "/disponibilidade", label: "Disponibilidade" },
  { href: "/reservar", label: "Reservar" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b ${
        isHome ? "bg-charcoal-900/95 border-white/10" : "bg-charcoal-900 border-white/10"
      } backdrop-blur`}
    >
      <div className="section flex items-center justify-between h-20">
        <Link href="/" className="font-display text-2xl text-white tracking-wide">
          Salão <span className="text-gold-400">Viana</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm tracking-wide transition-colors ${
                pathname === l.href ? "text-gold-400" : "text-white/80 hover:text-gold-400"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {session?.user ? (
            <>
              <Link
                href={session.user.role === "ADMIN" ? "/admin" : "/painel"}
                className="flex items-center gap-1.5 text-sm text-white/90 hover:text-gold-400"
              >
                <LayoutDashboard size={16} />
                {session.user.role === "ADMIN" ? "Painel Admin" : "O Meu Painel"}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1.5 text-sm text-white/70 hover:text-gold-400"
              >
                <LogOut size={16} /> Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-1.5 text-sm text-white/90 hover:text-gold-400">
                <User size={16} /> Entrar
              </Link>
              <Link href="/reservar" className="btn-primary !px-5 !py-2 text-sm">
                Reservar Agora
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-charcoal-900 border-t border-white/10 px-6 pb-6 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/90 text-sm py-1">
              {l.label}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-1" />
          {session?.user ? (
            <>
              <Link
                href={session.user.role === "ADMIN" ? "/admin" : "/painel"}
                onClick={() => setOpen(false)}
                className="text-white/90 text-sm"
              >
                {session.user.role === "ADMIN" ? "Painel Admin" : "O Meu Painel"}
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="text-left text-white/70 text-sm">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="text-white/90 text-sm">
                Entrar
              </Link>
              <Link href="/reservar" onClick={() => setOpen(false)} className="btn-primary text-sm w-fit">
                Reservar Agora
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

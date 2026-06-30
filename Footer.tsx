import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white/80 mt-20">
      <div className="section py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-xl text-white mb-3">
            Salão <span className="text-gold-400">Viana</span>
          </h3>
          <p className="text-sm text-white/60 leading-relaxed">
            Elegância, conforto e organização impecável para casamentos, eventos corporativos e celebrações privadas.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">Navegação</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/galeria" className="hover:text-gold-400">Galeria</Link></li>
            <li><Link href="/disponibilidade" className="hover:text-gold-400">Disponibilidade</Link></li>
            <li><Link href="/reservar" className="hover:text-gold-400">Reservar</Link></li>
            <li><Link href="/contacto" className="hover:text-gold-400">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone size={14} className="text-gold-400" /> +258 84 000 0000</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-gold-400" /> contacto@salaoviana.co.mz</li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-gold-400" /> Av. Principal, Xai-Xai, Moçambique</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3 text-sm tracking-wide uppercase">Siga-nos</h4>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-full hover:border-gold-400 hover:text-gold-400"><Facebook size={16} /></a>
            <a href="#" className="w-9 h-9 flex items-center justify-center border border-white/20 rounded-full hover:border-gold-400 hover:text-gold-400"><Instagram size={16} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Salão de Eventos Viana. Todos os direitos reservados.
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import {
  Snowflake, Car, Accessibility, Mic2, Lightbulb, Music,
  UtensilsCrossed, ShowerHead, ShieldCheck, Wifi, Users, ThermometerSun,
} from "lucide-react";
import { galleryImages, amenities, salonDescription } from "@/lib/data";

const amenityIcons = [
  Users, Snowflake, Car, Accessibility, Mic2, Lightbulb,
  Music, UtensilsCrossed, ShowerHead, ShieldCheck, Wifi, ThermometerSun,
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[600px] w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f29c8e8d4f?q=80&w=2000&auto=format&fit=crop"
          alt="Salão de Eventos Viana"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/90" />
        <div className="relative z-10 section animate-fadeUp">
          <p className="uppercase tracking-[0.3em] text-gold-400 text-xs md:text-sm mb-5">
            Elegância · Conforto · Organização
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight">
            Salão de Eventos <span className="text-gold-400">Viana</span>
          </h1>
          <p className="text-white/80 max-w-xl mx-auto mb-10 text-sm md:text-base">
            O espaço perfeito para casamentos, conferências e celebrações memoráveis, com capacidade para até 500 convidados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservar" className="btn-primary">Reservar Agora</Link>
            <Link href="/disponibilidade" className="btn-outline">Ver Disponibilidade</Link>
          </div>
        </div>
      </section>

      {/* Descrição */}
      <section className="section py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase tracking-[0.25em] text-gold-600 text-xs mb-4">Sobre o Salão</p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">Um espaço pensado para cada detalhe</h2>
          <p className="text-charcoal-700 leading-relaxed text-[15px] md:text-base">{salonDescription}</p>
        </div>
      </section>

      {/* Comodidades */}
      <section className="bg-charcoal-900 py-20">
        <div className="section">
          <p className="uppercase tracking-[0.25em] text-gold-400 text-xs mb-4 text-center">Infraestrutura</p>
          <h2 className="font-display text-3xl md:text-4xl text-white text-center mb-14">O que oferecemos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {amenities.map((item, i) => {
              const Icon = amenityIcons[i] || Users;
              return (
                <div key={item} className="border border-white/10 hover:border-gold-400/50 transition-colors rounded-sm p-6 flex flex-col items-center text-center gap-3">
                  <Icon className="text-gold-400" size={26} />
                  <span className="text-white/85 text-sm">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Galeria preview */}
      <section className="section py-20 md:py-28">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="uppercase tracking-[0.25em] text-gold-600 text-xs mb-3">Galeria</p>
            <h2 className="font-display text-3xl md:text-4xl">Conheça o espaço</h2>
          </div>
          <Link href="/galeria" className="text-sm text-gold-600 hover:text-gold-700 underline underline-offset-4">
            Ver galeria completa
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.slice(0, 6).map((img, i) => (
            <div key={i} className={`relative overflow-hidden rounded-sm ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
              <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="relative py-24 bg-gold-500">
        <div className="section text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-5">
            Pronto para celebrar o seu evento connosco?
          </h2>
          <p className="text-charcoal-800/80 mb-8 max-w-xl mx-auto text-sm md:text-base">
            Verifique a disponibilidade e garanta já a data ideal para a sua celebração.
          </p>
          <Link href="/reservar" className="btn-dark">Fazer Reserva Agora</Link>
        </div>
      </section>
    </div>
  );
}

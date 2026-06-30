import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Salão de Eventos Viana | Elegância para a sua celebração",
    template: "%s | Salão de Eventos Viana",
  },
  description:
    "Salão de Eventos Viana: o local ideal para casamentos, eventos corporativos, conferências e celebrações privadas. Capacidade para 500 convidados, em Xai-Xai, Moçambique.",
  keywords: [
    "salão de eventos",
    "salão de festas Moçambique",
    "casamentos Xai-Xai",
    "eventos corporativos",
    "aluguer de salão",
    "Salão Viana",
  ],
  openGraph: {
    title: "Salão de Eventos Viana",
    description:
      "O local ideal para quem procura elegância, conforto e organização impecável em cada detalhe.",
    type: "website",
    locale: "pt_MZ",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-MZ" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

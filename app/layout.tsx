import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "FacilitaCAR — Manual Simplificado do Cadastro Ambiental Rural",
  description:
    "Descubra de forma simples e gratuita como fazer, corrigir ou regularizar o seu Cadastro Ambiental Rural (CAR). Um guia passo a passo para produtores rurais.",
  keywords: [
    "CAR",
    "Cadastro Ambiental Rural",
    "regularização rural",
    "SICAR",
    "propriedade rural",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={plusJakarta.variable}>
      <body>{children}</body>
    </html>
  );
}

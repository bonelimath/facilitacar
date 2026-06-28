import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const BASE_URL = "https://facilitacar.mboneli.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "FacilitaCAR — Manual Simplificado do Cadastro Ambiental Rural",
  description:
    "Guia gratuito e simplificado para fazer, corrigir ou regularizar o seu Cadastro Ambiental Rural (CAR). Descubra os documentos necessários e onde buscar atendimento no seu estado.",
  keywords: [
    "CAR",
    "Cadastro Ambiental Rural",
    "regularização ambiental rural",
    "SICAR",
    "propriedade rural",
    "imóvel rural",
    "reserva legal",
    "APP",
    "georreferenciamento",
    "CCIR",
    "ITR",
    "produtor rural",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "FacilitaCAR",
    title: "FacilitaCAR — Manual Simplificado do Cadastro Ambiental Rural",
    description:
      "Guia gratuito e simplificado para fazer, corrigir ou regularizar o seu Cadastro Ambiental Rural (CAR). Descubra os documentos necessários e onde buscar atendimento no seu estado.",
    locale: "pt_BR",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "FacilitaCAR — Manual Simplificado do CAR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FacilitaCAR — Manual Simplificado do Cadastro Ambiental Rural",
    description:
      "Guia gratuito e simplificado para fazer, corrigir ou regularizar o seu Cadastro Ambiental Rural (CAR).",
    images: ["/logo.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FacilitaCAR",
    url: BASE_URL,
    description:
      "Guia gratuito e simplificado para fazer, corrigir ou regularizar o Cadastro Ambiental Rural (CAR).",
    inLanguage: "pt-BR",
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como fazer o Cadastro Ambiental Rural (CAR)",
    description:
      "Guia passo a passo para registrar o CAR da sua propriedade rural de forma simples.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Reúna os documentos necessários",
        text: "Separe CPF, RG, comprovante de endereço, matrícula do imóvel, CCIR, ITR e, se disponível, o georreferenciamento da propriedade.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Acesse o sistema do seu estado",
        text: "Alguns estados possuem sistema próprio de emissão do CAR. Caso contrário, utilize o Portal SICAR Nacional em car.gov.br.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Preencha os dados e delimite a propriedade",
        text: "Informe os dados do proprietário e da propriedade, depois desenhe os limites no mapa usando imagens de satélite disponíveis no sistema.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Acompanhe a análise e regularização",
        text: "Após o envio, acompanhe as notificações pelo e-mail cadastrado e pelo aplicativo Meu Imóvel Rural.",
      },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={plusJakarta.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

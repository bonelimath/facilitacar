"use client";

import { ESTADOS_LIST, beneficiosCAR } from "@/lib/car-data";

const IconSprout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20h10"/>
    <path d="M10 20c5.5-2.5.8-6.4 3-9"/>
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/>
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>
  </svg>
);

const IconMapPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const IconCheck = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

export default function StepIntro({
  selectedUF,
  onUFChange,
  onContinue,
}: {
  selectedUF: string;
  onUFChange: (uf: string) => void;
  onContinue: () => void;
}) {
  return (
    <div className="animate-in grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center py-6">
      {/* Coluna esquerda — badge, H1, seleção de UF, CTA */}
      <div className="space-y-7">
        <div className="inline-flex items-center text-[13px] font-semibold text-white bg-[rgba(116,230,166,.13)] border border-[rgba(116,230,166,.25)] px-4 py-1.5 rounded-full">
          Guia gratuito e simplificado
        </div>

        <h1 className="text-[30px] sm:text-[42px] lg:text-[50px] leading-[1.05] font-extrabold tracking-[-0.02em] text-[#eaf6ee]">
          Manual Simplificado do{" "}
          <span className="text-[#74e6a6]">CAR</span>
        </h1>

        <p className="text-[17px] text-[rgba(255,255,255,.78)] leading-relaxed">
          Este guia ajuda você a{" "}
          <strong className="text-[#eaf6ee] font-semibold">
            fazer, corrigir ou regularizar
          </strong>{" "}
          o seu Cadastro Ambiental Rural de forma simples, sem complicação.
        </p>

        {/* Card de seleção de UF */}
        <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.10)] rounded-[16px] p-5 space-y-3">
          <p className="text-[12px] font-bold uppercase tracking-[0.05em] text-[rgba(255,255,255,.75)] flex items-center gap-1.5">
            <IconMapPin />
            Selecione seu estado
          </p>
          <div className="relative">
            <select
              value={selectedUF}
              onChange={(e) => onUFChange(e.target.value)}
              className="w-full bg-[rgba(255,255,255,.06)] border border-[rgba(255,255,255,.15)] text-[#eaf6ee] rounded-[13px] px-4 py-3 text-[15px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#74e6a6] pr-10"
            >
              <option value="" disabled className="bg-[#0b3a28]">
                Escolha um estado…
              </option>
              {ESTADOS_LIST.map((e) => (
                <option key={e.value} value={e.value} className="bg-[#0b3a28] text-[#eaf6ee]">
                  {e.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#74e6a6]">
              <IconChevronDown />
            </span>
          </div>
          <p className="text-[12.5px] text-[rgba(255,255,255,.62)]">
            Mostraremos apenas as informações do seu estado.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onContinue}
            disabled={!selectedUF}
            className="inline-flex items-center gap-3 bg-[#45d183] hover:bg-[#3bc476] active:bg-[#2fb368] disabled:opacity-40 disabled:cursor-not-allowed text-[#08301f] font-bold px-8 py-4 rounded-[13px] text-[16px] transition-colors shadow-[0_12px_26px_rgba(69,209,131,.28)]"
          >
            Entendi, quero continuar
            <IconArrowRight />
          </button>
          <p className="text-[13px] text-[rgba(255,255,255,.62)]">
            Leva menos de 2 minutos para descobrir o que você precisa.
          </p>
        </div>
      </div>

      {/* Coluna direita — card "O que é o CAR?" com benefícios */}
      <div className="bg-[rgba(255,255,255,.05)] border border-[rgba(255,255,255,.12)] rounded-[18px] p-7 space-y-5">
        <h2 className="text-[20px] font-bold text-[#eaf6ee]">
          Você sabe o que é o CAR?
        </h2>
        <p className="text-[15px] text-[rgba(255,255,255,.78)] leading-relaxed">
          O{" "}
          <strong className="text-[#74e6a6] font-semibold">
            Cadastro Ambiental Rural (CAR)
          </strong>{" "}
          é um registro obrigatório para toda propriedade ou posse rural. Ele
          serve para mostrar onde fica sua área de produção, as áreas de
          preservação e outras informações ambientais.
        </p>
        <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-[rgba(255,255,255,.75)]">
          Ter o CAR regularizado pode ajudar você a:
        </p>
        <ul className="space-y-3">
          {beneficiosCAR.map((b) => (
            <li key={b} className="flex items-center gap-3 text-[15px] text-[#eaf6ee]">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[rgba(69,209,131,.15)] flex items-center justify-center text-[#45d183]">
                <IconCheck />
              </span>
              {b}
            </li>
          ))}
        </ul>

        <p className="text-[13.5px] text-[rgba(255,255,255,.85)] pt-1">
          Mais informações,{" "}
          <a
            href="https://www.car.gov.br/#/sobre"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9B7A4E] hover:text-[#B08C5E] font-bold transition-colors"
          >
            clique aqui
          </a>
          .
        </p>

        <div className="border-t border-[rgba(255,255,255,.10)] pt-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-[13px] text-[rgba(255,255,255,.72)] leading-relaxed flex-1">
            Acesse o aplicativo{" "}
            <strong className="text-[#eaf6ee] font-semibold">Meu Imóvel Rural</strong>{" "}
            para consultar informações do seu imóvel, acompanhar a situação do CAR, verificar notificações e pendências e acessar outros serviços de regularização ambiental.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=br.gov.dataprev.meuimovelrural"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[rgba(255,255,255,.18)] text-white rounded-[10px] px-4 py-2.5 transition-colors"
          >
            <svg width="20" height="22" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48 16L288 256L48 496C30.4 487.2 18 468.8 18 448V64C18 43.2 30.4 24.8 48 16Z" fill="#32BBFF"/>
              <path d="M366 194L48 16C30.4 24.8 18 43.2 18 64L288 256L366 194Z" fill="#32BBFF"/>
              <path d="M366 318L288 256L18 448C18 468.8 30.4 487.2 48 496L366 318Z" fill="#32BBFF"/>
              <path d="M432 288C448.4 278.4 458 262.4 458 256C458 249.6 448.4 233.6 432 224L366 194L288 256L366 318L432 288Z" fill="#FFD400"/>
              <path d="M48 496L288 256L366 318L48 496Z" fill="#FF3333"/>
              <path d="M48 16L288 256L366 194L48 16Z" fill="#00F076"/>
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="text-[9px] text-[rgba(255,255,255,.7)] uppercase tracking-wide">Disponível no</span>
              <span className="text-[14px] font-semibold">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

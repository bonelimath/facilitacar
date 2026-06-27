"use client";

import { useState } from "react";
import type { Path } from "@/app/page";
import { documentos, itensCorrecao } from "@/lib/car-data";

const IconArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/>
    <path d="m12 5-7 7 7 7"/>
  </svg>
);

const IconArrowRight = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const IconCheck = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const IconCheckCircle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const IconXCircle = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="m15 9-6 6"/>
    <path d="m9 9 6 6"/>
  </svg>
);

type Phase = "confirm" | "select";

export default function StepChecklist({
  path,
  onContinue,
  onBack,
}: {
  path: Path;
  onContinue: (selected: string[]) => void;
  onBack: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("confirm");
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const items = path === "new" ? documentos : itensCorrecao;
  const isNew = path === "new";

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ── Fase 1: verificação ───────────────────────────────────────────────────
  if (phase === "confirm") {
    return (
      <div className="animate-in w-full max-w-[720px] mx-auto space-y-6 py-4">
        <div className="space-y-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[14px] text-[rgba(255,255,255,.78)] hover:text-[#74e6a6] transition-colors"
          >
            <IconArrowLeft />
            Voltar
          </button>
          <h2 className="text-[30px] sm:text-[34px] font-extrabold tracking-[-0.02em] text-[#eaf6ee]">
            {isNew
              ? "Verificação de documentos"
              : "Verificação de pendências"}
          </h2>
          <p className="text-[15px] text-[rgba(255,255,255,.78)]">
            {isNew
              ? "Confira se você possui todos os documentos necessários para fazer o CAR:"
              : "Confira os itens que podem precisar de correção no seu CAR:"}
          </p>
        </div>

        {/* Lista de referência (somente leitura) */}
        <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.10)] rounded-[16px] divide-y divide-[rgba(255,255,255,.07)]">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3 px-5 py-3.5">
              <span className="flex-shrink-0 mt-0.5 text-[#74e6a6]">
                <IconCheck />
              </span>
              <div>
                <p className="font-semibold text-[15px] text-[#eaf6ee]">{item.label}</p>
                <p className="text-[13px] text-[rgba(255,255,255,.62)] mt-0.5">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pergunta de confirmação */}
        <div className="bg-[rgba(255,255,255,.05)] border border-[rgba(255,255,255,.12)] rounded-[16px] p-6 space-y-4">
          <p className="text-[17px] font-bold text-[#eaf6ee]">
            {isNew
              ? "Você possui todos esses documentos?"
              : "Há algo que você precisa corrigir?"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Sim */}
            <button
              onClick={() => onContinue([])}
              className="flex-1 flex items-center justify-center gap-2.5 bg-[#45d183] hover:bg-[#3bc476] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(69,209,131,.35)] active:bg-[#2fb368] active:translate-y-0 text-white font-bold px-6 py-3.5 rounded-[13px] text-[15px] transition-all shadow-[0_12px_26px_rgba(69,209,131,.28)]"
            >
              <IconCheckCircle />
              {isNew ? "Sim, possuo todos" : "Não, está tudo certo"}
              <IconArrowRight />
            </button>
            {/* Não */}
            <button
              onClick={() => setPhase("select")}
              className="flex-1 flex items-center justify-center gap-2.5 bg-[#7A5A35] hover:bg-[#8B6A42] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(122,90,53,.35)] active:bg-[#6B4E2C] active:translate-y-0 text-white font-semibold px-6 py-3.5 rounded-[13px] text-[15px] transition-all shadow-[0_4px_14px_rgba(122,90,53,.25)]"
            >
              <IconXCircle />
              {isNew ? "Não, faltam alguns" : "Sim, quero corrigir"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Fase 2: seleção dos itens faltantes ──────────────────────────────────
  return (
    <div className="animate-in w-full max-w-[720px] mx-auto space-y-6 py-4">
      <div className="space-y-3">
        <button
          onClick={() => { setPhase("confirm"); setChecked(new Set()); }}
          className="flex items-center gap-1.5 text-[14px] text-[rgba(255,255,255,.78)] hover:text-[#74e6a6] transition-colors"
        >
          <IconArrowLeft />
          Voltar
        </button>
        <h2 className="text-[30px] sm:text-[34px] font-extrabold tracking-[-0.02em] text-[#eaf6ee]">
          {isNew
            ? "Quais documentos você não possui?"
            : "O que você precisa corrigir?"}
        </h2>
        <p className="text-[15px] text-[rgba(255,255,255,.78)]">
          {isNew
            ? "Selecione os documentos que estão faltando."
            : "Selecione os itens que deseja corrigir ou atualizar."}
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const isChecked = checked.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`w-full text-left flex items-start gap-4 p-4 rounded-[14px] border-2 transition-all duration-150 ${
                isChecked
                  ? "border-[#45d183] bg-[rgba(69,209,131,.10)] shadow-[0_4px_16px_rgba(69,209,131,.12)]"
                  : "border-[rgba(255,255,255,.10)] bg-[rgba(255,255,255,.04)] hover:border-[rgba(255,255,255,.30)] hover:bg-[rgba(255,255,255,.08)] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,.2)]"
              }`}
            >
              <div
                className={`mt-0.5 flex-shrink-0 w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-colors ${
                  isChecked
                    ? "border-[#45d183] bg-[#45d183]"
                    : "border-[rgba(255,255,255,.30)]"
                }`}
              >
                {isChecked && (
                  <span className="text-[#08301f]">
                    <IconCheck />
                  </span>
                )}
              </div>
              <div>
                <p className="font-semibold text-[15px] text-[#eaf6ee]">{item.label}</p>
                <p className="text-[13.5px] text-[rgba(255,255,255,.78)] mt-0.5">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-2">
        <button
          disabled={checked.size === 0}
          onClick={() => onContinue(Array.from(checked))}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#45d183] hover:bg-[#3bc476] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(69,209,131,.35)] active:bg-[#2fb368] active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none text-[#08301f] font-bold px-8 py-4 rounded-[13px] text-[15px] transition-all shadow-[0_12px_26px_rgba(69,209,131,.28)]"
        >
          Ver orientações ({checked.size} item{checked.size !== 1 ? "s" : ""})
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import StepIntro from "@/components/StepIntro";
import StepPathSelect from "@/components/StepPathSelect";
import StepChecklist from "@/components/StepChecklist";
import StepResult from "@/components/StepResult";
import Chatbot from "@/components/Chatbot";

export type Step = "intro" | "path" | "checklist" | "result";
export type Path = "new" | "correct";

export default function Home() {
  const [step, setStep] = useState<Step>("intro");
  const [path, setPath] = useState<Path | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedUF, setSelectedUF] = useState<string>("");

  function handlePathSelect(p: Path) {
    setPath(p);
    setSelected([]);
    setStep("checklist");
  }

  function handleChecklistContinue(ids: string[]) {
    setSelected(ids);
    setStep("result");
  }

  function restart() {
    setStep("intro");
    setPath(null);
    setSelected([]);
    // UF mantida para não forçar o usuário a re-selecionar
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#082d1f]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={restart}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/car-logo.png"
              alt="FacilitaCAR"
              width={24}
              height={24}
              className="h-4 w-auto"
            />
            <span className="font-bold text-[16px] text-[#eaf6ee]">
              Facilita<span className="text-[#74e6a6]">CAR</span>
            </span>
          </button>
          <span className="text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide text-white bg-[rgba(116,230,166,.13)] border border-[rgba(116,230,166,.25)] text-center leading-tight">
            Manual Simplificado<br />do CAR
          </span>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-6 lg:px-12 py-10">
        {step === "intro" && (
          <StepIntro
            selectedUF={selectedUF}
            onUFChange={setSelectedUF}
            onContinue={() => setStep("path")}
          />
        )}
        {step === "path" && (
          <StepPathSelect
            onSelect={handlePathSelect}
            onBack={() => setStep("intro")}
          />
        )}
        {step === "checklist" && path && (
          <StepChecklist
            path={path}
            onContinue={handleChecklistContinue}
            onBack={() => setStep("path")}
          />
        )}
        {step === "result" && path && (
          <StepResult
            path={path}
            selected={selected}
            selectedUF={selectedUF}
            onRestart={restart}
            onBack={() => setStep("checklist")}
          />
        )}
      </div>

      <Chatbot />

      <footer className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-[13px] text-[rgba(255,255,255,1)]">
          FacilitaCAR © {new Date().getFullYear()} — Todos os direitos reservados
        </div>
      </footer>
    </main>
  );
}

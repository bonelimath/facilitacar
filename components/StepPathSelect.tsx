import type { Path } from "@/app/page";
import type React from "react";

const IconArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/>
    <path d="m12 5-7 7 7 7"/>
  </svg>
);

const IconArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const IconClipboard = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <path d="M12 11h4"/>
    <path d="M12 16h4"/>
    <path d="M8 11h.01"/>
    <path d="M8 16h.01"/>
  </svg>
);

const IconPencil = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  </svg>
);

const paths: {
  id: Path;
  Icon: React.FC;
  title: string;
  description: string;
}[] = [
  {
    id: "new",
    Icon: IconClipboard,
    title: "Fazer um novo cadastro",
    description:
      "Nunca fiz o CAR da minha propriedade e quero fazer pela primeira vez.",
  },
  {
    id: "correct",
    Icon: IconPencil,
    title: "Corrigir um cadastro existente",
    description:
      "Já fiz a solicitação do CAR ou tenho CAR emitido, mas possuo informações desatualizadas, notificações ou pendências.",
  },
];

export default function StepPathSelect({
  onSelect,
  onBack,
}: {
  onSelect: (p: Path) => void;
  onBack: () => void;
}) {
  return (
    <div className="animate-in w-full max-w-[720px] mx-auto space-y-8 py-4">
      <div className="space-y-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[14px] text-[rgba(255,255,255,.78)] hover:text-[#74e6a6] transition-colors"
        >
          <IconArrowLeft />
          Voltar
        </button>
        <h2 className="text-[30px] sm:text-[34px] font-extrabold tracking-[-0.02em] text-[#eaf6ee]">
          Como podemos ajudar você hoje?
        </h2>
        <p className="text-[15px] text-[rgba(255,255,255,.78)]">
          Selecione a opção que mais se parece com sua situação.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {paths.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className="text-left bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.10)] hover:border-[rgba(116,230,166,.50)] hover:bg-[rgba(255,255,255,.08)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,.25)] rounded-[16px] p-6 transition-all duration-200 active:scale-[0.98] active:translate-y-0"
          >
            <div className="text-[#74e6a6] mb-4">
              <p.Icon />
            </div>
            <h3 className="font-bold text-[18px] text-[#eaf6ee] mb-2">{p.title}</h3>
            <p className="text-[14px] text-[rgba(255,255,255,.78)] leading-relaxed">
              {p.description}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[14px] font-semibold text-[#74e6a6]">
              Selecionar
              <IconArrowRight />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

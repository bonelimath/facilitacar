"use client";

import type { Path } from "@/app/page";
import {
  documentos,
  itensCorrecao,
  orgaosPorUF,
  estadosSistemaProprio,
  portalSicarNacional,
  ESTADOS_LIST,
} from "@/lib/car-data";

const IconArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/>
    <path d="m12 5-7 7 7 7"/>
  </svg>
);

const IconAlertCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
);

const IconExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6"/>
    <path d="M10 14 21 3"/>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  </svg>
);

const IconRotateCCW = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

const IconMapPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.17 6.17l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const IconMail = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

export default function StepResult({
  path,
  selected,
  selectedUF,
  onRestart,
  onBack,
}: {
  path: Path;
  selected: string[];
  selectedUF: string;
  onRestart: () => void;
  onBack: () => void;
}) {
  const isNew = path === "new";

  const selectedItems =
    selected.length > 0
      ? isNew
        ? documentos.filter((d) => selected.includes(d.id))
        : itensCorrecao.filter((d) => selected.includes(d.id))
      : [];

  const ufSistema = estadosSistemaProprio.find((e) => e.uf === selectedUF);
  const orgao = orgaosPorUF.find((o) => o.uf === selectedUF);
  const ufLabel =
    ESTADOS_LIST.find((e) => e.value === selectedUF)?.label ?? selectedUF;

  return (
    <div className="animate-in w-full max-w-[720px] mx-auto space-y-6 py-4">
      {/* Cabeçalho */}
      <div className="space-y-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[14px] text-[rgba(255,255,255,.78)] hover:text-[#74e6a6] transition-colors"
        >
          <IconArrowLeft />
          Voltar
        </button>
        <h2 className="text-[30px] sm:text-[34px] font-extrabold tracking-[-0.02em] text-[#eaf6ee]">
          {selectedItems.length === 0
            ? isNew
              ? "Ótimo! Você tem tudo que precisa."
              : "Tudo certo com seu CAR!"
            : "Suas orientações"}
        </h2>
        <p className="text-[15px] text-[rgba(255,255,255,.78)]">
          {selectedItems.length === 0
            ? isNew
              ? "Com todos os documentos em mãos, você está pronto para emitir seu CAR."
              : "Parece que seu cadastro não precisa de correções no momento."
            : "Baseado na sua seleção, veja o que você precisa fazer para cada item."}
        </p>
      </div>

      {/* Cards de orientação por documento */}
      {selectedItems.length > 0 && isNew && (
        <div className="space-y-3">
          {(selectedItems as typeof documentos).map((doc) => (
            <div
              key={doc.id}
              className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.10)] rounded-[16px] p-5"
            >
              <h3 className="font-bold text-[17px] text-[#eaf6ee] flex items-start gap-2.5">
                <span className="flex-shrink-0 mt-0.5 text-[#74e6a6]">
                  <IconAlertCircle />
                </span>
                {doc.label}
              </h3>
              <p className="mt-2 text-[14.5px] text-[rgba(255,255,255,.78)] leading-relaxed">
                {doc.result.text}
              </p>
              {doc.result.note && (
                <p className="mt-3 text-[13px] text-[#f4de9b] bg-[rgba(244,222,155,.10)] border border-[rgba(244,222,155,.30)] rounded-[10px] px-3 py-2">
                  {doc.result.note}
                </p>
              )}
              {doc.result.link && (
                <a
                  href={doc.result.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#74e6a6] hover:text-[#8ff0bc] transition-colors"
                >
                  {doc.result.link.label}
                  <IconExternalLink />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {!isNew && selectedItems.length > 0 && (
        <div className="space-y-3">
          {(selectedItems as typeof itensCorrecao)
            .reduce<typeof itensCorrecao>((unique, item) => {
              if (!unique.find((u) => u.result.title === item.result.title)) {
                unique.push(item);
              }
              return unique;
            }, [])
            .map((item) => (
              <div
                key={item.id}
                className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.10)] rounded-[16px] p-5"
              >
                <h3 className="font-bold text-[17px] text-[#eaf6ee] flex items-center gap-2.5">
                  <span className="text-[#74e6a6]">
                    <IconAlertCircle />
                  </span>
                  {item.result.title}
                </h3>
                <p className="mt-2 text-[14.5px] text-[rgba(255,255,255,.78)] leading-relaxed">
                  {item.result.text}
                </p>
                {item.result.links && item.result.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.result.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#74e6a6] hover:text-[#8ff0bc] transition-colors"
                      >
                        {link.label}
                        <IconExternalLink />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Aviso SICAR — e-mail */}
      {selectedItems.length > 0 && (
        <div className="flex gap-3 bg-[rgba(250,204,21,.08)] border border-[rgba(250,204,21,.30)] rounded-[14px] px-5 py-4">
          <span className="flex-shrink-0 mt-0.5 text-[#facc15]">
            <IconAlertCircle />
          </span>
          <div className="space-y-1">
            <p className="text-[14px] text-[#fde68a] leading-relaxed">
              A Central do Proprietário/Possuidor do SICAR envia, para o e-mail cadastrado na solicitação do Cadastro Ambiental Rural (CAR), as notificações e pendências do cadastro.
            </p>
            <p className="text-[13.5px] text-[#fde68a] font-semibold">
              Obs.: Verifique seu e-mail para conferir se há alguma notificação pendente.
            </p>
          </div>
        </div>
      )}

      {/* CTA emissão do CAR filtrada por UF — apenas para novo cadastro */}
      {isNew && <div className="bg-[rgba(255,255,255,.05)] border border-[rgba(255,255,255,.12)] rounded-[16px] p-6 space-y-4">
        {selectedUF && (
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold uppercase tracking-[0.05em] text-[rgba(255,255,255,.62)]">
              Seu estado:
            </span>
            <span className="inline-flex items-center text-[13px] font-semibold text-white bg-[rgba(116,230,166,.13)] border border-[rgba(116,230,166,.25)] px-3 py-0.5 rounded-full">
              {ufLabel}
            </span>
          </div>
        )}
        <h3 className="text-[20px] font-bold text-[#eaf6ee]">
          {isNew ? "Pronto para emitir seu CAR?" : "Onde regularizar seu CAR?"}
        </h3>
        <p className="text-[14.5px] text-[rgba(255,255,255,.78)] leading-relaxed">
          {ufSistema
            ? `${ufLabel} possui um sistema próprio de emissão do CAR. Acesse diretamente para iniciar.`
            : `${ufLabel || "Seu estado"} utiliza o Portal SICAR Nacional para emissão e regularização do CAR.`}
        </p>
        <a
          href={ufSistema ? ufSistema.url : portalSicarNacional}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#45d183] hover:bg-[#3bc476] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(69,209,131,.35)] active:bg-[#2fb368] active:translate-y-0 text-[#08301f] font-bold px-5 py-3 rounded-[13px] text-[14.5px] transition-all shadow-[0_12px_26px_rgba(69,209,131,.28)]"
        >
          {ufSistema ? "Acessar sistema do estado" : "Acessar Portal SICAR Nacional"}
          <IconExternalLink />
        </a>
      </div>}

      {/* Ponto de atendimento — sempre visível */}
      {orgao && (
        <div className="bg-[rgba(255,255,255,.04)] border border-[rgba(255,255,255,.10)] rounded-[16px] p-5 space-y-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.05em] text-[rgba(255,255,255,.75)]">
            Ponto de atendimento
          </p>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-[10px] bg-[rgba(116,230,166,.13)] border border-[rgba(116,230,166,.25)] flex items-center justify-center text-[#74e6a6] font-bold text-[13px] flex-shrink-0">
              {orgao.uf}
            </div>
            <div className="flex-1 space-y-2">
              <p className="font-bold text-[16px] text-[#eaf6ee]">{orgao.orgao}</p>

              {orgao.telefone !== "-" ? (
                <p className="flex items-center gap-2 text-[14px] text-[rgba(255,255,255,.78)]">
                  <span className="text-[#74e6a6]"><IconPhone /></span>
                  {orgao.telefone}
                </p>
              ) : (
                <p className="flex items-center gap-2 text-[14px] text-[rgba(255,255,255,.48)]">
                  <span className="text-[#74e6a6]"><IconPhone /></span>
                  Não informado
                </p>
              )}

              {orgao.email !== "-" && orgao.email !== "FaleCAR" ? (
                <p className="flex items-center gap-2 text-[14px] text-[rgba(255,255,255,.78)]">
                  <span className="text-[#74e6a6]"><IconMail /></span>
                  {orgao.email}
                </p>
              ) : (
                <p className="flex items-center gap-2 text-[14px] text-[rgba(255,255,255,.48)]">
                  <span className="text-[#74e6a6]"><IconMail /></span>
                  Não informado
                </p>
              )}

              <p className="flex items-start gap-2 text-[14px] text-[rgba(255,255,255,.78)]">
                <span className="text-[#74e6a6] mt-0.5 flex-shrink-0"><IconMapPin /></span>
                {orgao.endereco}
              </p>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(orgao.endereco)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#7A5A35] hover:bg-[#8B6A42] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(122,90,53,.35)] active:bg-[#6B4E2C] active:translate-y-0 text-white font-semibold px-4 py-2.5 rounded-[11px] text-[13.5px] transition-all shadow-[0_4px_14px_rgba(122,90,53,.25)]"
          >
            <IconMapPin />
            Ver localização no Google Maps
            <IconExternalLink />
          </a>
        </div>
      )}

      {/* App Meu Imóvel Rural */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 bg-[rgba(250,204,21,.08)] border border-[rgba(250,204,21,.30)] rounded-[14px] px-5 py-4">
        <div className="flex gap-3 flex-1">
          <span className="flex-shrink-0 mt-0.5 text-[#facc15]">
            <IconAlertCircle />
          </span>
          <p className="text-[14px] text-[#fde68a] leading-relaxed">
            Acesse informações do seu imóvel rural, acompanhe pendências e notificações e facilite a solicitação do Cadastro Ambiental Rural (CAR).
          </p>
        </div>
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

      {/* Recomeçar */}
      <div className="pt-2">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 border-2 border-[rgba(116,230,166,.25)] text-[#74e6a6] hover:border-[rgba(116,230,166,.55)] hover:bg-[rgba(116,230,166,.06)] hover:-translate-y-0.5 active:translate-y-0 font-semibold px-6 py-3 rounded-[13px] text-[14px] transition-all"
        >
          <IconRotateCCW />
          Recomeçar do início
        </button>
      </div>
    </div>
  );
}

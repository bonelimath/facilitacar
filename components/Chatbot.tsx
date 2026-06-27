"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Que documentos eu preciso?",
  "Como emitir o CCIR?",
  "Onde fazer o CAR?",
  "O que é Reserva Legal?",
  "O que é APP?",
  "É gratuito fazer o CAR?",
];

const IconChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

const IconSend = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o CarBot.\n\nEstou aqui para tirar suas dúvidas sobre o Cadastro Ambiental Rural. Clique em uma das opções abaixo ou escreva sua dúvida!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Desculpe, ocorreu um erro. Tente novamente." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar chat" : "Abrir chat"}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
          open
            ? "bg-[rgba(255,255,255,.12)] text-[#eaf6ee] hover:bg-[rgba(255,255,255,.18)] shadow-[0_4px_14px_rgba(0,0,0,.35)]"
            : "bg-[#45d183] text-[#08301f] hover:bg-[#3bc476] pulse-glow"
        }`}
      >
        {open ? <IconX /> : <IconChat />}
      </button>

      {/* Janela do chat */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-24px))] rounded-2xl border border-[rgba(255,255,255,.10)] flex flex-col overflow-hidden animate-in"
          style={{
            maxHeight: "calc(100vh - 120px)",
            height: 520,
            background: "#0c3a27",
            boxShadow: "0 20px 50px rgba(0,0,0,.45)",
          }}
        >
          {/* Header */}
          <div className="bg-[#082d1f] border-b border-[rgba(255,255,255,.08)] px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-[rgba(69,209,131,.15)] border border-[rgba(69,209,131,.25)] flex items-center justify-center text-[#45d183]">
              <IconChat />
            </div>
            <div>
              <p className="font-bold text-[14px] text-[#eaf6ee]">CarBot</p>
              <p className="text-[12px] text-[rgba(255,255,255,.55)]">Assistente do CAR</p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 text-[12px] text-[rgba(255,255,255,.55)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#45d183] animate-pulse" />
              Online
            </span>
          </div>

          {/* Mensagens */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(116,230,166,.2) transparent" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-[#45d183] text-[#08301f] font-medium rounded-br-sm"
                      : "bg-[rgba(255,255,255,.07)] text-[#eaf6ee] rounded-bl-sm border border-[rgba(255,255,255,.08)]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[rgba(255,255,255,.07)] border border-[rgba(255,255,255,.08)] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <span
                      key={i}
                      className="typing-dot w-2 h-2 rounded-full bg-[rgba(255,255,255,.48)]"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Sugestões — sempre visíveis, desabilitadas durante loading */}
          <div className="relative flex-shrink-0 border-t border-[rgba(255,255,255,.06)]">
            <div
              className="px-3 pt-2 pb-1 flex gap-2 overflow-x-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(116,230,166,.30) rgba(255,255,255,.04)",
              }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  disabled={loading}
                  className="whitespace-nowrap text-[12px] text-[#8ff0bc] bg-[rgba(116,230,166,.10)] hover:bg-[rgba(116,230,166,.18)] disabled:opacity-35 border border-[rgba(116,230,166,.22)] px-3 py-1.5 rounded-full transition-colors flex-shrink-0"
                >
                  {s}
                </button>
              ))}
            </div>
            {/* Fade indicando mais conteúdo à direita */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#0c3a27] to-transparent" />
          </div>

          {/* Input */}
          <div className="border-t border-[rgba(255,255,255,.08)] p-3 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Escreva sua dúvida..."
              className="flex-1 bg-[rgba(255,255,255,.06)] border border-[rgba(255,255,255,.12)] text-[#eaf6ee] placeholder:text-[rgba(255,255,255,.40)] rounded-xl px-4 py-2.5 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#74e6a6] focus:border-transparent"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-[#45d183] hover:bg-[#3bc476] disabled:opacity-40 text-[#08301f] flex items-center justify-center transition-colors flex-shrink-0"
            >
              <IconSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

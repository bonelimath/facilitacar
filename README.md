# FacilitaCAR

Guia digital gratuito e simplificado para produtores rurais que precisam **fazer, corrigir ou regularizar** o seu Cadastro Ambiental Rural (CAR) — sem burocracia e sem complicação.

O CAR é um registro obrigatório para toda propriedade ou posse rural no Brasil. Este projeto orienta o produtor passo a passo, filtrando as informações pelo estado selecionado e indicando o órgão de atendimento correto para cada UF.

---

## Funcionalidades

- Seleção do estado (UF) com filtragem de todo o conteúdo
- Dois fluxos distintos: **novo cadastro** e **correção de cadastro existente**
- Checklist interativo em duas fases (verificação → seleção de pendências)
- Orientações personalizadas por documento ou pendência
- Indicação do portal correto (sistema estadual próprio ou SICAR Nacional)
- Card de contato do órgão ambiental estadual com endereço e link para o Google Maps
- Chatbot assistente com respostas por palavras-chave sobre o CAR

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| [Next.js 15](https://nextjs.org/) (App Router) | Framework principal, roteamento e otimizações |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática em todo o projeto |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização via classes utilitárias e `@theme` tokens |
| [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) | Carregamento otimizado da fonte Plus Jakarta Sans |
| [next/image](https://nextjs.org/docs/app/building-your-application/optimizing/images) | Otimização automática da logo |

---

## Técnicas e decisões de projeto

**Arquitetura de componentes**
- Estado `selectedUF` elevado ao `page.tsx` (_state lifting_) para ser compartilhado entre `StepIntro` e `StepResult` sem prop drilling excessivo
- Fluxo de etapas controlado por uma máquina de estados simples (`intro → path → checklist → result`)

**UX do checklist em duas fases**
- Fase 1: lista somente-leitura + pergunta de confirmação ("você possui todos?")
- Fase 2: seleção interativa apenas dos itens faltantes
- Evita a confusão cognitiva de "marcar o que não tenho"

**Design system no Tailwind v4**
- Paleta definida via `@theme` no `globals.css` com tokens nomeados (`--color-green-deep`, `--color-cta`, etc.)
- Tema escuro com gradiente radial no `body`, sem dependência de modo claro/escuro
- Hierarquia visual com três camadas: branco puro → `rgba(255,255,255,.78)` → `rgba(255,255,255,.62)`

**Ícones sem biblioteca externa**
- Todos os ícones são SVG inline no estilo Lucide, sem dependência de pacote de ícones
- Reduz bundle e mantém controle total sobre tamanho e stroke

**Chatbot por palavras-chave**
- Sem chamada a API de IA — respostas geradas localmente por correspondência de termos normalizados (lowercase + remoção de acentos)
- Mais de 20 categorias temáticas cobrindo dúvidas frequentes sobre o CAR
- Sugestões sempre visíveis, com scroll horizontal e fade lateral indicando overflow

**Filtragem por UF**
- `orgaosPorUF`: mapeamento dos 27 estados com nome do órgão, telefone, e-mail e endereço
- `estadosSistemaProprio`: lista dos estados com sistema próprio de emissão, redirecionando para o portal correto em vez do SICAR Nacional
- Link dinâmico para o Google Maps gerado via `encodeURIComponent` do endereço

**Animações em CSS puro**
- `floatUp`: entrada suave das etapas ao trocar de passo
- `pulseGlow`: efeito de pulso no botão do chatbot para indicar interatividade
- `typingBounce`: animação dos dots enquanto o chatbot processa a resposta

---

## Estrutura do projeto

```
facilitacar/
├── app/
│   ├── api/chat/route.ts     # Lógica do chatbot (keyword fallback)
│   ├── globals.css            # Tokens de design e animações globais
│   ├── layout.tsx             # Fonte e metadados
│   └── page.tsx               # Orquestração de etapas e estado global
├── components/
│   ├── StepIntro.tsx          # Seleção de UF e apresentação
│   ├── StepPathSelect.tsx     # Escolha do fluxo (novo / corrigir)
│   ├── StepChecklist.tsx      # Verificação de documentos/pendências
│   ├── StepResult.tsx         # Orientações e ponto de atendimento
│   └── Chatbot.tsx            # Assistente flutuante
├── lib/
│   └── car-data.ts            # Dados dos 27 estados, documentos e orientações
└── public/
    └── car-logo.png
```

---

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

---

## Licença

Este projeto é de uso público e educacional. Os dados de contato dos órgãos ambientais estaduais são de domínio público.

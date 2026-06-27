import { NextRequest, NextResponse } from "next/server";

type Message = { role: "user" | "assistant"; content: string };
type Keyword = { word: string; weight: number };
type Topic = {
  id: string;
  patterns?: RegExp[];
  keywords: Keyword[];
  relatedTopics?: string[];
  responses: string[];
};

function norm(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function tokenize(text: string): string[] {
  return text.split(/[\s,!?.;:()"'\-]+/).filter(w => w.length > 1);
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const row = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = i;
    for (let j = 1; j <= n; j++) {
      const val = a[i - 1] === b[j - 1]
        ? row[j - 1]
        : 1 + Math.min(row[j], prev, row[j - 1]);
      row[j - 1] = prev;
      prev = val;
    }
    row[n] = prev;
  }
  return row[n];
}

// Returns 0 (no match) to 1 (exact). Short words require exact match.
function similarity(token: string, keyword: string): number {
  if (token === keyword) return 1;
  const tl = token.length, kl = keyword.length;
  if (tl < 4 || kl < 4) return 0;
  const maxLen = Math.max(tl, kl);
  const allowed = maxLen <= 6 ? 1 : 2;
  const dist = levenshtein(token, keyword);
  if (dist > allowed) return 0;
  return 1 - dist / (allowed + 1);
}

const TOPICS: Topic[] = [
  {
    id: "saudacao",
    patterns: [
      /\b(oi|ola|alo|hey|salve)\b/,
      /\bbom\s*dia\b/,
      /\bboa\s*(tarde|noite|manha)\b/,
      /\bcomo\s*(vai|esta|voce)\b/,
      /\btudo\s*(bem|bom|ok|certo)\b/,
    ],
    keywords: [
      { word: "oi", weight: 10 },
      { word: "ola", weight: 10 },
      { word: "hey", weight: 10 },
      { word: "alo", weight: 10 },
      { word: "salve", weight: 10 },
    ],
    responses: [
      "Olá! Sou o CarBot, seu assistente do Cadastro Ambiental Rural.\n\nComo posso te ajudar hoje?",
      "Oi! Pode perguntar à vontade sobre o CAR. Estou aqui para ajudar!",
      "Olá! Me conta como posso te ajudar com o CAR.",
    ],
  },
  {
    id: "agradecimento",
    keywords: [
      { word: "obrigado", weight: 12 },
      { word: "obrigada", weight: 12 },
      { word: "valeu", weight: 12 },
      { word: "otimo", weight: 8 },
      { word: "perfeito", weight: 8 },
      { word: "entendi", weight: 10 },
      { word: "consegui", weight: 10 },
      { word: "funcionou", weight: 10 },
      { word: "resolvido", weight: 10 },
      { word: "excelente", weight: 8 },
    ],
    responses: [
      "Fico feliz em ajudar! Se tiver mais dúvidas sobre o CAR, é só perguntar.",
      "Disponha! Qualquer outra dúvida sobre o CAR, pode perguntar.",
      "Por nada! Estou aqui se precisar de mais ajuda com o CAR.",
    ],
  },
  {
    id: "o_que_e_car",
    patterns: [
      /\bo\s*que\s*(e|eh)\s*(o\s*)?(car|cadastro)\b/,
      /\bpara\s*que\s*serve\b/,
      /\bpra\s*que\s*serve\b/,
      /\bfinalidade\s*(do\s*)?(car)?\b/,
      /\bo\s*que\s*significa\b/,
    ],
    keywords: [
      { word: "significado", weight: 10 },
      { word: "significa", weight: 10 },
      { word: "finalidade", weight: 10 },
      { word: "definicao", weight: 10 },
      { word: "conceito", weight: 8 },
      { word: "explicar", weight: 6 },
      { word: "explica", weight: 6 },
      { word: "sigla", weight: 10 },
      { word: "serve", weight: 5 },
      { word: "lei", weight: 4 },
    ],
    responses: [
      "O CAR (Cadastro Ambiental Rural) é um registro público eletrônico, obrigatório para toda propriedade rural.\n\nEle mapeia as informações ambientais do imóvel: áreas de produção, Reserva Legal, APPs e vegetação nativa.\n\nFoi criado pela Lei 12.651/2012 e serve como base para o monitoramento e regularização ambiental no Brasil.",
    ],
  },
  {
    id: "documentos",
    patterns: [
      /\bquais\s*(sao|os)?\s*documentos?\b/,
      /\bo\s*que\s*(eu\s*)?(preciso|necessito)\b/,
      /\bque\s*documentos?\b/,
    ],
    keywords: [
      { word: "documento", weight: 8 },
      { word: "documentos", weight: 8 },
      { word: "lista", weight: 6 },
      { word: "necessario", weight: 7 },
      { word: "necessarios", weight: 7 },
      { word: "preciso", weight: 5 },
      { word: "precisar", weight: 5 },
      { word: "levar", weight: 5 },
      { word: "separar", weight: 5 },
      { word: "juntar", weight: 5 },
      { word: "exigido", weight: 7 },
      { word: "requisito", weight: 7 },
      { word: "requisitos", weight: 7 },
    ],
    responses: [
      "Para fazer o CAR pela primeira vez, você vai precisar de:\n\n• CPF\n• RG\n• Comprovante de endereço\n• Matrícula do imóvel\n• Escritura da propriedade\n• CCIR\n• ITR\n• Mapa da propriedade\n\nUse o guia acima para marcar o que você não tem!",
    ],
  },
  {
    id: "ccir",
    keywords: [
      { word: "ccir", weight: 15 },
      { word: "certificado", weight: 5 },
      { word: "incra", weight: 10 },
      { word: "sncr", weight: 12 },
      { word: "imovel", weight: 3 },
    ],
    relatedTopics: ["documentos", "itr"],
    responses: [
      "O CCIR (Certificado de Cadastro de Imóvel Rural) é a identidade do seu imóvel rural.\n\nVocê pode emiti-lo gratuitamente no site do INCRA:\nsncr.serpro.gov.br/ccir/emissao\n\nTenha em mãos o código do imóvel, UF, município e seu CPF.",
    ],
  },
  {
    id: "itr",
    keywords: [
      { word: "itr", weight: 15 },
      { word: "imposto", weight: 7 },
      { word: "territorial", weight: 10 },
      { word: "receita", weight: 5 },
      { word: "declaracao", weight: 5 },
      { word: "tributario", weight: 7 },
    ],
    relatedTopics: ["documentos", "ccir"],
    responses: [
      "O ITR (Imposto Territorial Rural) é o imposto da propriedade rural.\n\nA declaração pode ser consultada ou gerada junto à Receita Federal pelo site gov.br.",
    ],
  },
  {
    id: "georreferenciamento",
    keywords: [
      { word: "georreferenciamento", weight: 15 },
      { word: "georreferencia", weight: 15 },
      { word: "georreferenciado", weight: 15 },
      { word: "coordenada", weight: 8 },
      { word: "coordenadas", weight: 8 },
      { word: "sigef", weight: 12 },
      { word: "agrimensor", weight: 12 },
      { word: "levantamento", weight: 6 },
      { word: "topografia", weight: 8 },
      { word: "gps", weight: 7 },
    ],
    responses: [
      "O georreferenciamento é um levantamento técnico que mostra exatamente onde sua propriedade está, usando coordenadas.\n\nNormalmente precisa ser feito por profissional habilitado (engenheiro agrimensor).\n\nMais informações: sigef.incra.gov.br",
    ],
  },
  {
    id: "mapa",
    keywords: [
      { word: "mapa", weight: 8 },
      { word: "desenho", weight: 6 },
      { word: "desenhar", weight: 6 },
      { word: "limite", weight: 6 },
      { word: "limites", weight: 6 },
      { word: "poligono", weight: 8 },
      { word: "delimitacao", weight: 8 },
      { word: "satelite", weight: 6 },
      { word: "contorno", weight: 6 },
    ],
    responses: [
      "O mapa da propriedade mostra os limites da sua terra. Para o CAR, você pode desenhar a área diretamente no sistema usando imagens de satélite — sem precisar de técnico na maioria dos casos.",
    ],
  },
  {
    id: "matricula",
    keywords: [
      { word: "matricula", weight: 12 },
      { word: "matriculas", weight: 12 },
      { word: "cartorio", weight: 7 },
      { word: "registro", weight: 5 },
      { word: "imoveis", weight: 4 },
      { word: "registrado", weight: 5 },
    ],
    relatedTopics: ["documentos", "escritura"],
    responses: [
      "A matrícula comprova quem é o dono da propriedade. Deve ser solicitada no Cartório de Registro de Imóveis responsável pela região do imóvel.",
    ],
  },
  {
    id: "escritura",
    keywords: [
      { word: "escritura", weight: 12 },
      { word: "tabelionato", weight: 12 },
      { word: "compra", weight: 4 },
      { word: "heranca", weight: 8 },
      { word: "doacao", weight: 8 },
      { word: "inventario", weight: 8 },
      { word: "aquisicao", weight: 6 },
      { word: "lavrada", weight: 8 },
    ],
    relatedTopics: ["documentos", "matricula"],
    responses: [
      "A escritura mostra como a propriedade foi adquirida (compra, herança, doação etc.).\n\nÉ lavrada em Cartório de Notas (Tabelionato). Leve seus documentos pessoais e o contrato ou inventário.",
    ],
  },
  {
    id: "cpf",
    keywords: [
      { word: "cpf", weight: 15 },
    ],
    relatedTopics: ["documentos"],
    responses: [
      "O CPF pode ser emitido ou regularizado na Receita Federal com um documento de identificação.\n\nAcesse: gov.br/receitafederal → Meu CPF.",
    ],
  },
  {
    id: "rg",
    keywords: [
      { word: "rg", weight: 15 },
      { word: "identidade", weight: 10 },
      { word: "identificacao", weight: 8 },
      { word: "certidao", weight: 6 },
      { word: "nascimento", weight: 5 },
      { word: "casamento", weight: 5 },
    ],
    relatedTopics: ["documentos"],
    responses: [
      "O RG é emitido pelo Instituto de Identificação da Secretaria de Segurança Pública do seu estado. Procure o posto de identificação mais próximo levando sua certidão de nascimento ou casamento.",
    ],
  },
  {
    id: "comprovante",
    keywords: [
      { word: "comprovante", weight: 12 },
      { word: "endereco", weight: 8 },
      { word: "residencia", weight: 8 },
      { word: "luz", weight: 6 },
      { word: "energia", weight: 5 },
      { word: "conta", weight: 4 },
      { word: "telefone", weight: 5 },
      { word: "morador", weight: 6 },
    ],
    relatedTopics: ["documentos"],
    responses: [
      "Serve uma conta recente de luz, água ou telefone em seu nome. Se não estiver em seu nome, é possível apresentar uma declaração de residência assinada.",
    ],
  },
  {
    id: "sicar",
    patterns: [
      /\bfazer\s*(o\s*)?(car|cadastro)\b/,
      /\bonde\s*(faz|fazer|cadastra|registrar)\b/,
      /\bcomo\s*(faz|cadastra|registrar)\b/,
    ],
    keywords: [
      { word: "sicar", weight: 15 },
      { word: "portal", weight: 7 },
      { word: "sistema", weight: 5 },
      { word: "site", weight: 5 },
      { word: "onde", weight: 3 },
      { word: "emitir", weight: 5 },
      { word: "cadastrar", weight: 8 },
      { word: "intranet", weight: 8 },
      { word: "estadual", weight: 4 },
      { word: "acessar", weight: 5 },
    ],
    responses: [
      "Você pode fazer o CAR no Portal SICAR Nacional:\ncar.gov.br/intranet\n\nAlguns estados têm sistema próprio:\nAC, BA, ES, GO, MT, MS, PA, RO, SC, SP e TO.\n\nUse o guia acima para ser direcionado ao portal certo do seu estado!",
    ],
  },
  {
    id: "correcao",
    keywords: [
      { word: "corrigir", weight: 10 },
      { word: "correcao", weight: 10 },
      { word: "corrigindo", weight: 10 },
      { word: "atualizar", weight: 7 },
      { word: "atualizacao", weight: 7 },
      { word: "erro", weight: 8 },
      { word: "errado", weight: 8 },
      { word: "errei", weight: 8 },
      { word: "pendencia", weight: 8 },
      { word: "notificacao", weight: 8 },
      { word: "irregularidade", weight: 10 },
      { word: "problema", weight: 5 },
      { word: "invalido", weight: 8 },
      { word: "recusado", weight: 8 },
      { word: "reprovado", weight: 8 },
      { word: "consertar", weight: 8 },
      { word: "reenviar", weight: 6 },
    ],
    responses: [
      "Para corrigir o CAR, acesse o mesmo portal onde fez o cadastro e solicite uma análise de correção.\n\nVocê vai precisar de:\n• Matrícula atualizada\n• Documentos pessoais\n• Novo mapa, dependendo da correção\n\nUse o guia acima escolhendo 'Corrigir um cadastro existente'!",
    ],
  },
  {
    id: "reserva_legal",
    patterns: [
      /\breserva\s*legal\b/,
    ],
    keywords: [
      { word: "reserva", weight: 10 },
      { word: "legal", weight: 5 },
      { word: "preservar", weight: 5 },
      { word: "preservado", weight: 5 },
      { word: "vegetacao", weight: 5 },
      { word: "percentual", weight: 7 },
      { word: "porcentagem", weight: 7 },
    ],
    relatedTopics: ["app", "bioma"],
    responses: [
      "A Reserva Legal é uma área dentro da propriedade que deve ficar preservada por lei.\n\nO percentual varia por bioma:\n• 80% na Amazônia\n• 35% no Cerrado na Amazônia Legal\n• 20% nas demais regiões\n\nEssa área deve ser registrada no CAR.",
    ],
  },
  {
    id: "app",
    patterns: [
      /\barea\s*de\s*preserva[a-z]*\s*permanente\b/,
      /\bmargem\s*d[eo]\s*(rio|lago|agua)\b/,
    ],
    keywords: [
      { word: "app", weight: 12 },
      { word: "permanente", weight: 6 },
      { word: "margem", weight: 8 },
      { word: "nascente", weight: 10 },
      { word: "lagoa", weight: 8 },
      { word: "lago", weight: 6 },
      { word: "rio", weight: 6 },
      { word: "encosta", weight: 8 },
      { word: "morro", weight: 7 },
      { word: "manguezal", weight: 10 },
      { word: "ciliar", weight: 8 },
    ],
    relatedTopics: ["reserva_legal", "mapa"],
    responses: [
      "APP (Área de Preservação Permanente) são locais com proteção especial:\n\n• Margens de rios e lagos\n• Nascentes\n• Encostas e topos de morro\n• Manguezais\n\nEssas áreas precisam ser identificadas no mapa do CAR.",
    ],
  },
  {
    id: "pra",
    patterns: [
      /\bprograma\s*(de\s*)?regulariz[a-z]*/,
    ],
    keywords: [
      { word: "programa", weight: 8 },
      { word: "regularizacao", weight: 8 },
      { word: "regularizar", weight: 6 },
      { word: "passivo", weight: 10 },
      { word: "deficit", weight: 5 },
      { word: "debito", weight: 5 },
    ],
    responses: [
      "O PRA (Programa de Regularização Ambiental) permite que propriedades com passivos ambientais regularizem sua situação. O primeiro passo é ter o CAR aprovado.",
    ],
  },
  {
    id: "obrigatoriedade",
    patterns: [
      /\be\s*obrigatorio\b/,
      /\btenho\s*(que|de)\s*fazer\b/,
    ],
    keywords: [
      { word: "obrigatorio", weight: 12 },
      { word: "obrigacao", weight: 12 },
      { word: "multa", weight: 10 },
      { word: "penalidade", weight: 10 },
      { word: "sancao", weight: 8 },
      { word: "punido", weight: 8 },
      { word: "exigido", weight: 5 },
    ],
    responses: [
      "O CAR é obrigatório para toda propriedade rural desde 2012. Sem o CAR, a propriedade pode:\n\n• Ter dificuldade para acessar crédito rural\n• Não participar de programas do governo\n• Enfrentar restrições na regularização ambiental",
    ],
  },
  {
    id: "credito",
    keywords: [
      { word: "credito", weight: 10 },
      { word: "financiamento", weight: 10 },
      { word: "banco", weight: 7 },
      { word: "pronaf", weight: 15 },
      { word: "pronamp", weight: 15 },
      { word: "beneficio", weight: 7 },
      { word: "beneficios", weight: 7 },
      { word: "vantagem", weight: 7 },
      { word: "seguro", weight: 5 },
      { word: "emprestimo", weight: 8 },
      { word: "financiar", weight: 8 },
    ],
    responses: [
      "Ter o CAR regularizado é requisito para:\n\n• Crédito rural (Pronaf, Pronamp etc.)\n• Programas de regularização ambiental\n• Seguros agrícolas\n• Certificações de produtos rurais",
    ],
  },
  {
    id: "custo",
    patterns: [
      /\bquanto\s*custa\b/,
      /\btem\s*custo\b/,
      /\be\s*(cobrado|pago|gratuito|de\s*graca)\b/,
    ],
    keywords: [
      { word: "gratuito", weight: 12 },
      { word: "custo", weight: 10 },
      { word: "gratis", weight: 12 },
      { word: "graca", weight: 10 },
      { word: "preco", weight: 10 },
      { word: "valor", weight: 6 },
      { word: "pago", weight: 10 },
      { word: "pagar", weight: 8 },
      { word: "taxa", weight: 10 },
      { word: "cobrado", weight: 10 },
      { word: "dinheiro", weight: 6 },
      { word: "grana", weight: 8 },
      { word: "caro", weight: 8 },
      { word: "barato", weight: 8 },
    ],
    responses: [
      "O CAR é totalmente gratuito! Tanto o cadastro quanto as correções não têm custo.\n\nSe precisar de um técnico para o georreferenciamento, esse serviço pode ter custo — mas o registro no SICAR é sem taxa.",
    ],
  },
  {
    id: "tempo",
    patterns: [
      /\bquanto\s*tempo\b/,
      /\bquanto\s*demora\b/,
      /\bdemora\s*quanto\b/,
      /\bprazo\s*de\s*analise\b/,
    ],
    keywords: [
      { word: "demora", weight: 10 },
      { word: "demorar", weight: 10 },
      { word: "rapido", weight: 5 },
      { word: "prazo", weight: 7 },
      { word: "analise", weight: 7 },
      { word: "status", weight: 10 },
      { word: "acompanhar", weight: 7 },
      { word: "aprovado", weight: 6 },
      { word: "aprovacao", weight: 6 },
      { word: "pendente", weight: 6 },
      { word: "aguardando", weight: 6 },
      { word: "fila", weight: 6 },
    ],
    responses: [
      "O envio do cadastro pode ser feito no mesmo dia. A análise pelo órgão ambiental do estado pode levar semanas ou meses, dependendo da fila.\n\nVocê pode acompanhar o status pelo mesmo portal onde fez o cadastro.",
    ],
  },
  {
    id: "cancelamento",
    keywords: [
      { word: "cancelar", weight: 12 },
      { word: "cancelamento", weight: 12 },
      { word: "excluir", weight: 10 },
      { word: "deletar", weight: 10 },
      { word: "desativar", weight: 10 },
      { word: "remover", weight: 8 },
      { word: "encerrar", weight: 8 },
    ],
    responses: [
      "Para cancelar ou excluir um CAR, é necessário entrar em contato diretamente com o órgão ambiental do seu estado. O processo varia conforme a situação do cadastro.",
    ],
  },
  {
    id: "bioma",
    keywords: [
      { word: "bioma", weight: 12 },
      { word: "biomas", weight: 12 },
      { word: "amazonia", weight: 10 },
      { word: "cerrado", weight: 10 },
      { word: "caatinga", weight: 10 },
      { word: "pantanal", weight: 10 },
      { word: "pampa", weight: 10 },
      { word: "atlantica", weight: 8 },
    ],
    relatedTopics: ["reserva_legal"],
    responses: [
      "O bioma define as regras de Reserva Legal:\n\n• Amazônia: 80%\n• Cerrado na Amazônia Legal: 35%\n• Caatinga, Cerrado, Pantanal, Mata Atlântica e Pampa fora da Amazônia: 20%",
    ],
  },
];

const SCORE_THRESHOLD = 4;
const CONTEXT_BOOST = 1.35;

function scoreTopic(text: string, tokens: string[], topic: Topic): number {
  let score = 0;

  if (topic.patterns) {
    for (const pat of topic.patterns) {
      if (pat.test(text)) score += 20;
    }
  }

  for (const { word, weight } of topic.keywords) {
    let best = 0;
    for (const token of tokens) {
      const sim = similarity(token, word);
      if (sim > best) best = sim;
    }
    if (best > 0) score += weight * best;
  }

  return score;
}

function getLastTopicId(messages: Message[]): string | null {
  const prevUser = messages.slice(0, -1).filter(m => m.role === "user");
  if (prevUser.length === 0) return null;
  const last = prevUser[prevUser.length - 1];
  const text = norm(last.content);
  const tokens = tokenize(text);
  let best = { id: "", score: 0 };
  for (const topic of TOPICS) {
    const s = scoreTopic(text, tokens, topic);
    if (s > best.score) best = { id: topic.id, score: s };
  }
  return best.score >= SCORE_THRESHOLD ? best.id : null;
}

function pickResponse(responses: string[], seed: string): string {
  if (responses.length === 1) return responses[0];
  const h = Math.abs([...seed].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0));
  return responses[h % responses.length];
}

function getBestReply(messages: Message[]): string {
  const lastMsg = messages.at(-1)?.content ?? "";
  const text = norm(lastMsg);
  const tokens = tokenize(text);
  const contextId = messages.length > 1 ? getLastTopicId(messages) : null;

  let best = { topic: null as Topic | null, score: 0 };

  for (const topic of TOPICS) {
    let score = scoreTopic(text, tokens, topic);
    if (contextId && score > 0) {
      const ctxTopic = TOPICS.find(t => t.id === contextId);
      const related =
        topic.id === contextId ||
        ctxTopic?.relatedTopics?.includes(topic.id);
      if (related) score *= CONTEXT_BOOST;
    }
    if (score > best.score) best = { topic, score };
  }

  if (!best.topic || best.score < SCORE_THRESHOLD) {
    return "Não tenho uma resposta específica para isso, mas posso te ajudar com:\n\n• Documentos necessários para o CAR\n• Como emitir o CCIR\n• Onde fazer ou corrigir o CAR\n• Reserva Legal e APP\n• Custos e prazos\n\nTente uma das sugestões abaixo ou use o guia interativo acima!";
  }

  return pickResponse(best.topic.responses, lastMsg);
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await req.json();
    const reply = getBestReply(messages);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Ocorreu um erro. Tente novamente." });
  }
}

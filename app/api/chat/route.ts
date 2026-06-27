import { NextRequest, NextResponse } from "next/server";

type Message = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await req.json();
    const reply = fallbackReply(messages.at(-1)?.content ?? "");
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Ocorreu um erro. Tente novamente." });
  }
}

function norm(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function fallbackReply(userMsg: string): string {
  const msg = norm(userMsg);

  if (/\b(oi|ola|boa\s*(tarde|noite|manha)|bom\s*dia|tudo\s*bem|como\s*vai|hey)\b/.test(msg)) {
    return "Olá! Sou o CarBot, seu assistente do Cadastro Ambiental Rural.\n\nComo posso te ajudar hoje?";
  }

  if (/obrigado|valeu|otimo|perfeito|ok\b|entendi|certo|consegui/.test(msg)) {
    return "Fico feliz em ajudar! Se tiver mais dúvidas sobre o CAR, é só perguntar.";
  }

  if (/documento|preciso|necessario|lista|o que (eu )?preciso|quais/.test(msg)) {
    return "Para fazer o CAR pela primeira vez, você vai precisar de:\n\n• CPF\n• RG\n• Comprovante de endereço\n• Matrícula do imóvel\n• Escritura da propriedade\n• CCIR\n• ITR\n• Mapa da propriedade\n\nUse o guia acima para marcar o que você não tem!";
  }

  if (/\bccir\b/.test(msg)) {
    return "O CCIR (Certificado de Cadastro de Imóvel Rural) é a identidade do seu imóvel rural.\n\nVocê pode emiti-lo gratuitamente no site do INCRA:\nsncr.serpro.gov.br/ccir/emissao\n\nTenha em mãos o código do imóvel, UF, município e seu CPF.";
  }

  if (/\bitr\b/.test(msg)) {
    return "O ITR (Imposto Territorial Rural) é o imposto da propriedade rural.\n\nA declaração pode ser consultada ou gerada junto à Receita Federal pelo site gov.br.";
  }

  if (/georrefer|georref|coordenada|sigef/.test(msg)) {
    return "O georreferenciamento é um levantamento técnico que mostra exatamente onde sua propriedade está, usando coordenadas.\n\nNormalmente precisa ser feito por profissional habilitado (engenheiro agrimensor).\n\nMais informações: sigef.incra.gov.br";
  }

  if (/\bmapa\b|desenh|limite/.test(msg)) {
    return "O mapa da propriedade mostra os limites da sua terra. Para o CAR, você pode desenhar a área diretamente no sistema usando imagens de satélite — sem precisar de técnico na maioria dos casos.";
  }

  if (/matricula/.test(msg)) {
    return "A matrícula comprova quem é o dono da propriedade. Deve ser solicitada no Cartório de Registro de Imóveis responsável pela região do imóvel.";
  }

  if (/escritura/.test(msg)) {
    return "A escritura mostra como a propriedade foi adquirida (compra, herança, doação etc.).\n\nÉ lavrada em Cartório de Notas (Tabelionato). Leve seus documentos pessoais e o contrato ou inventário.";
  }

  if (/\bcpf\b/.test(msg)) {
    return "O CPF pode ser emitido ou regularizado na Receita Federal com um documento de identificação.\n\nAcesse: gov.br/receitafederal → Meu CPF.";
  }

  if (/\brg\b|identidade/.test(msg)) {
    return "O RG é emitido pelo Instituto de Identificação da Secretaria de Segurança Pública do seu estado. Procure o posto de identificação mais próximo levando sua certidão de nascimento ou casamento.";
  }

  if (/comprovante|endereco/.test(msg)) {
    return "Serve uma conta recente de luz, água ou telefone em seu nome. Se não estiver em seu nome, é possível apresentar uma declaração de residência assinada.";
  }

  if (/sicar|portal|sistema|site|onde|emitir|fazer o car|cadastrar|como faz/.test(msg)) {
    return "Você pode fazer o CAR no Portal SICAR Nacional:\ncar.gov.br/intranet\n\nAlguns estados têm sistema próprio:\nAC, BA, ES, GO, MT, MS, PA, RO, SC, SP e TO.\n\nUse o guia acima para ser direcionado ao portal certo do seu estado!";
  }

  if (/corrigir|correcao|atualizar|erro|pendencia|notificacao|irregularidade|problema/.test(msg)) {
    return "Para corrigir o CAR, acesse o mesmo portal onde fez o cadastro e solicite uma análise de correção.\n\nVocê vai precisar de:\n• Matrícula atualizada\n• Documentos pessoais\n• Novo mapa, dependendo da correção\n\nUse o guia acima escolhendo 'Corrigir um cadastro existente'!";
  }

  if (/reserva\s*legal/.test(msg)) {
    return "A Reserva Legal é uma área dentro da propriedade que deve ficar preservada por lei.\n\nO percentual varia por bioma:\n• 80% na Amazônia\n• 35% no Cerrado na Amazônia Legal\n• 20% nas demais regiões\n\nEssa área deve ser registrada no CAR.";
  }

  if (/\bapp\b|preserva.{0,5}permanente|margem|nascente|lagoa|encosta|morro/.test(msg)) {
    return "APP (Área de Preservação Permanente) são locais com proteção especial:\n\n• Margens de rios e lagos\n• Nascentes\n• Encostas e topos de morro\n• Manguezais\n\nEssas áreas precisam ser identificadas no mapa do CAR.";
  }

  if (/\bpra\b|regulariza.{0,5}ambiental/.test(msg)) {
    return "O PRA (Programa de Regularização Ambiental) permite que propriedades com passivos ambientais regularizem sua situação. O primeiro passo é ter o CAR aprovado.";
  }

  if (/prazo|obrigatorio|multa|penalidade|quando\s*(tenho|devo|preciso)/.test(msg)) {
    return "O CAR é obrigatório para toda propriedade rural desde 2012. Sem o CAR, a propriedade pode:\n\n• Ter dificuldade para acessar crédito rural\n• Não participar de programas do governo\n• Enfrentar restrições na regularização ambiental";
  }

  if (/credito|financiamento|banco|pronaf|beneficio|vantagem/.test(msg)) {
    return "Ter o CAR regularizado é requisito para:\n\n• Crédito rural (Pronaf, Pronamp etc.)\n• Programas de regularização ambiental\n• Seguros agrícolas\n• Certificações de produtos rurais";
  }

  if (/gratu.{0,3}to|custo|valor|pago|preco|quanto custa|taxa/.test(msg)) {
    return "O CAR é totalmente gratuito! Tanto o cadastro quanto as correções não têm custo.\n\nSe precisar de um técnico para o georreferenciamento, esse serviço pode ter custo — mas o registro no SICAR é sem taxa.";
  }

  if (/tempo|demora|quanto\s*tempo|prazo\s*de\s*analise|status/.test(msg)) {
    return "O envio do cadastro pode ser feito no mesmo dia. A análise pelo órgão ambiental do estado pode levar semanas ou meses, dependendo da fila.\n\nVocê pode acompanhar o status pelo mesmo portal onde fez o cadastro.";
  }

  if (/cancelar|excluir|deletar|desativar|remov/.test(msg)) {
    return "Para cancelar ou excluir um CAR, é necessário entrar em contato diretamente com o órgão ambiental do seu estado. O processo varia conforme a situação do cadastro.";
  }

  if (/bioma|amazonia|cerrado|caatinga|pantanal|mata\s*atlantica|pampa/.test(msg)) {
    return "O bioma define as regras de Reserva Legal:\n\n• Amazônia: 80%\n• Cerrado na Amazônia Legal: 35%\n• Caatinga, Cerrado, Pantanal, Mata Atlântica e Pampa fora da Amazônia: 20%";
  }

  if (/o que e|o que eh|o que (é|e) o car|para que serve|finalidade/.test(msg)) {
    return "O CAR (Cadastro Ambiental Rural) é um registro público eletrônico, obrigatório para toda propriedade rural.\n\nEle mapeia as informações ambientais do imóvel: áreas de produção, Reserva Legal, APPs e vegetação nativa.\n\nFoi criado pela Lei 12.651/2012 e serve como base para o monitoramento e regularização ambiental no Brasil.";
  }

  return "Não tenho uma resposta específica para isso, mas posso te ajudar com:\n\n• Documentos necessários para o CAR\n• Como emitir o CCIR\n• Onde fazer ou corrigir o CAR\n• Reserva Legal e APP\n• Custos e prazos\n\nTente uma das sugestões abaixo ou use o guia interativo acima!";
}

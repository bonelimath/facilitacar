// Dados do Manual Simplificado do CAR.

export const ESTADOS_LIST = [
  { value: "AC", label: "Acre (AC)" },
  { value: "AL", label: "Alagoas (AL)" },
  { value: "AP", label: "Amapá (AP)" },
  { value: "AM", label: "Amazonas (AM)" },
  { value: "BA", label: "Bahia (BA)" },
  { value: "CE", label: "Ceará (CE)" },
  { value: "DF", label: "Distrito Federal (DF)" },
  { value: "ES", label: "Espírito Santo (ES)" },
  { value: "GO", label: "Goiás (GO)" },
  { value: "MA", label: "Maranhão (MA)" },
  { value: "MT", label: "Mato Grosso (MT)" },
  { value: "MS", label: "Mato Grosso do Sul (MS)" },
  { value: "MG", label: "Minas Gerais (MG)" },
  { value: "PA", label: "Pará (PA)" },
  { value: "PB", label: "Paraíba (PB)" },
  { value: "PR", label: "Paraná (PR)" },
  { value: "PE", label: "Pernambuco (PE)" },
  { value: "PI", label: "Piauí (PI)" },
  { value: "RJ", label: "Rio de Janeiro (RJ)" },
  { value: "RN", label: "Rio Grande do Norte (RN)" },
  { value: "RS", label: "Rio Grande do Sul (RS)" },
  { value: "RO", label: "Rondônia (RO)" },
  { value: "RR", label: "Roraima (RR)" },
  { value: "SC", label: "Santa Catarina (SC)" },
  { value: "SP", label: "São Paulo (SP)" },
  { value: "SE", label: "Sergipe (SE)" },
  { value: "TO", label: "Tocantins (TO)" },
];
// Centraliza todo o conteúdo do fluxo: documentos, correções, órgãos por UF e links.

export type DocItem = {
  id: string;
  label: string;
  description: string;
  /** Orientação exibida quando o usuário marca que NÃO possui o documento. */
  result: {
    text: string;
    note?: string;
    link?: { label: string; url: string };
  };
};

// ─── OPÇÃO 1 — Documentos para um novo cadastro ──────────────────────────────
export const documentos: DocItem[] = [
  {
    id: "cpf",
    label: "CPF",
    description: "O CPF é o documento que identifica você perante o governo.",
    result: {
      text: "O CPF pode ser emitido ou regularizado na Receita Federal. Você precisará de um documento de identificação.",
      link: {
        label: "Emitir/regularizar CPF na Receita Federal",
        url: "https://www.gov.br/receitafederal/pt-br/assuntos/meu-cpf",
      },
    },
  },
  {
    id: "rg",
    label: "RG",
    description: "Documento que comprova sua identidade.",
    result: {
      text: "O RG é emitido pelo Instituto de Identificação da Secretaria de Segurança Pública do seu estado. Procure o posto de identificação mais próximo levando certidão de nascimento ou casamento.",
    },
  },
  {
    id: "comprovante_endereco",
    label: "Comprovante de endereço",
    description: "Documento que mostra onde você mora.",
    result: {
      text: "Serve uma conta recente de luz, água ou telefone em seu nome. Caso não esteja em seu nome, é possível apresentar uma declaração de residência assinada.",
    },
  },
  {
    id: "matricula",
    label: "Matrícula do imóvel",
    description: "É o documento que prova quem é o proprietário da terra.",
    result: {
      text: 'A matrícula é a "certidão de nascimento" da propriedade. Ela deve ser solicitada no Cartório de Registro de Imóveis responsável pela região onde a propriedade está localizada.',
    },
  },
  {
    id: "escritura",
    label: "Escritura da propriedade",
    description: "Documento que mostra como a propriedade foi adquirida.",
    result: {
      text: "A escritura é lavrada em Cartório de Notas (Tabelionato). Para terras adquiridas por compra, herança ou doação, procure o tabelionato com seus documentos pessoais e o contrato ou inventário.",
    },
  },
  {
    id: "ccir",
    label: "CCIR",
    description:
      "É o Certificado de Cadastro de Imóvel Rural. Funciona como a identidade da propriedade rural.",
    result: {
      text: "O CCIR é a identidade do imóvel rural e pode ser emitido junto ao INCRA.",
      note: "Confira se você já não possui esse documento. Tenha em mãos o código do imóvel rural, UF, município e CPF ou CNPJ do titular declarante.",
      link: {
        label: "Emitir CCIR no INCRA/Serpro",
        url: "https://sncr.serpro.gov.br/ccir/emissao?windowId=40f",
      },
    },
  },
  {
    id: "itr",
    label: "ITR",
    description: "É a declaração do Imposto Territorial Rural.",
    result: {
      text: "O ITR é o imposto da propriedade rural. A declaração pode ser consultada junto à Receita Federal.",
      link: {
        label: "Declarar/consultar ITR",
        url: "https://www.gov.br/pt-br/servicos/declarar-imposto-sobre-a-propriedade-territorial-rural",
      },
    },
  },
  {
    id: "mapa",
    label: "Mapa da propriedade",
    description: "É o desenho que mostra os limites da sua terra.",
    result: {
      text: "O mapa mostra os limites da sua terra. Pode ser elaborado a partir do georreferenciamento ou por um técnico habilitado. Para o próprio CAR, é possível desenhar a área diretamente no sistema usando imagens de satélite.",
    },
  },
  {
    id: "georreferenciamento",
    label: "Georreferenciamento",
    description:
      "É um levantamento técnico que mostra exatamente onde a propriedade está localizada através de coordenadas.",
    result: {
      text: "Esse serviço normalmente precisa ser realizado por profissional habilitado, como engenheiro agrimensor ou técnico autorizado.",
      link: {
        label: "Saiba mais no SIGEF/INCRA",
        url: "https://sigef.incra.gov.br/",
      },
    },
  },
];

// ─── OPÇÃO 2 — Itens de correção de um cadastro existente ─────────────────────
export type CorrecaoItem = {
  id: string;
  label: string;
  description: string;
  result: {
    title: string;
    needs: string[];
    where?: string[];
  };
};

export const itensCorrecao: CorrecaoItem[] = [
  {
    id: "nome_proprietario",
    label: "Nome do proprietário",
    description: "Corrigir ou atualizar o nome do proprietário ou possuidor do imóvel.",
    result: {
      title: "Correção de informações do proprietário",
      needs: ["Documento de identidade", "CPF", "Documento que comprove a propriedade"],
    },
  },
  {
    id: "cpf_cnpj",
    label: "CPF ou CNPJ",
    description: "Corrigir o CPF ou CNPJ informado no cadastro.",
    result: {
      title: "Correção de informações do proprietário",
      needs: ["Documento de identidade", "CPF", "Documento que comprove a propriedade"],
    },
  },
  {
    id: "endereco_proprietario",
    label: "Endereço do proprietário",
    description: "Atualizar o endereço e os dados de contato do responsável pelo imóvel.",
    result: {
      title: "Correção de informações do proprietário",
      needs: ["Documento de identidade", "CPF", "Documento que comprove a propriedade"],
    },
  },
  {
    id: "area_propriedade",
    label: "Área da propriedade",
    description: "Corrigir a área total do imóvel cadastrada no CAR.",
    result: {
      title: "Correção de informações da propriedade",
      needs: ["Matrícula atualizada", "Mapa da propriedade", "Georreferenciamento (quando houver)"],
    },
  },
  {
    id: "limites_propriedade",
    label: "Limites da propriedade",
    description: "Corrigir as divisas e os limites da propriedade informados no mapa.",
    result: {
      title: "Correção de informações da propriedade",
      needs: ["Matrícula atualizada", "Mapa da propriedade", "Georreferenciamento (quando houver)"],
    },
  },
  {
    id: "mapa_incorreto",
    label: "Mapa desenhado incorretamente",
    description: "Corrigir erros no desenho da área do imóvel dentro do sistema.",
    result: {
      title: "Correção de informações da propriedade",
      needs: ["Matrícula atualizada", "Mapa da propriedade", "Georreferenciamento (quando houver)"],
    },
  },
  {
    id: "reserva_legal",
    label: "Reserva Legal",
    description: "Incluir, corrigir ou atualizar a área de Reserva Legal da propriedade.",
    result: {
      title: "Reserva Legal pendente",
      needs: ["Matrícula da propriedade", "Mapa da área", "Informações ambientais da propriedade"],
    },
  },
  {
    id: "app",
    label: "Área de Preservação Permanente (APP)",
    description: "Corrigir ou atualizar áreas de rios, nascentes, lagoas, encostas e demais APPs.",
    result: {
      title: "APP pendente",
      needs: ["Mapa da propriedade", "Informações da área protegida"],
    },
  },
  {
    id: "inclusao_documentos",
    label: "Inclusão de documentos",
    description: "Adicionar documentos que não foram anexados anteriormente.",
    result: {
      title: "Inclusão de documentos",
      needs: ["Documentos que faltam, digitalizados de forma legível (PDF ou imagem)"],
    },
  },
  {
    id: "exclusao_informacoes",
    label: "Exclusão de informações incorretas",
    description: "Remover dados, documentos ou informações cadastradas por engano.",
    result: {
      title: "Exclusão de informações incorretas",
      needs: ["Identificação do dado a ser removido", "Justificativa da correção"],
    },
  },
  {
    id: "atualizacao_posse",
    label: "Atualização de posse ou propriedade",
    description: "Informar mudança de proprietário, posse, herança, compra e venda ou doação.",
    result: {
      title: "Atualização de posse ou propriedade",
      needs: [
        "Documento que comprove a nova situação (escritura, contrato, inventário)",
        "Matrícula atualizada",
        "Documentos pessoais do novo titular",
      ],
    },
  },
  {
    id: "sobreposicao",
    label: "Sobreposição com imóvel vizinho",
    description: "Corrigir conflitos de limites entre propriedades vizinhas.",
    result: {
      title: "Sobreposição com imóvel vizinho",
      needs: ["Matrícula atualizada", "Mapa correto da propriedade", "Georreferenciamento"],
      where: ["Órgão ambiental", "Técnico especializado"],
    },
  },
];

// ─── Estados com sistema próprio de CAR ──────────────────────────────────────
export const estadosSistemaProprio: { uf: string; nome: string; url: string }[] = [
  { uf: "AC", nome: "Acre", url: "http://www.car.ac.gov.br/#/baixar" },
  { uf: "BA", nome: "Bahia", url: "https://www.sistema.seia.ba.gov.br/" },
  { uf: "ES", nome: "Espírito Santo", url: "http://simlam.idaf.es.gov.br/portal/" },
  { uf: "GO", nome: "Goiás", url: "https://portal.meioambiente.go.gov.br/" },
  { uf: "MT", nome: "Mato Grosso", url: "http://www.sema.mt.gov.br/car#/" },
  {
    uf: "MS",
    nome: "Mato Grosso do Sul",
    url: "https://www.ms.gov.br/agropecuaria-e-vida-rural/cadastro-ambiental-rural-de-mato-grosso-do-sul-carms38/",
  },
  { uf: "PA", nome: "Pará", url: "https://car.semas.pa.gov.br/#/" },
  { uf: "RO", nome: "Rondônia", url: "http://car.sedam.ro.gov.br/#/site" },
  { uf: "SC", nome: "Santa Catarina", url: "https://www.car.sc.gov.br/#/" },
  { uf: "SP", nome: "São Paulo", url: "https://car.agricultura.sp.gov.br/site/" },
  { uf: "TO", nome: "Tocantins", url: "http://sigcar.semarh.to.gov.br/" },
];

// ─── Estados que utilizam o SICAR Nacional ───────────────────────────────────
export const portalSicarNacional = "https://www.car.gov.br/intranet";
export const estadosSicarNacional: { uf: string; nome: string }[] = [
  { uf: "AL", nome: "Alagoas" },
  { uf: "AP", nome: "Amapá" },
  { uf: "AM", nome: "Amazonas" },
  { uf: "CE", nome: "Ceará" },
  { uf: "DF", nome: "Distrito Federal" },
  { uf: "MA", nome: "Maranhão" },
  { uf: "MG", nome: "Minas Gerais" },
  { uf: "PB", nome: "Paraíba" },
  { uf: "PR", nome: "Paraná" },
  { uf: "PE", nome: "Pernambuco" },
  { uf: "PI", nome: "Piauí" },
  { uf: "RJ", nome: "Rio de Janeiro" },
  { uf: "RN", nome: "Rio Grande do Norte" },
  { uf: "RS", nome: "Rio Grande do Sul" },
  { uf: "RR", nome: "Roraima" },
  { uf: "SE", nome: "Sergipe" },
];

// ─── Órgãos responsáveis pelo CAR por UF (pontos de regularização) ───────────
export type Orgao = {
  uf: string;
  orgao: string;
  cidade: string;
  telefone: string;
  email: string;
  endereco: string;
};

export const orgaosPorUF: Orgao[] = [
  { uf: "AC", orgao: "SEMA/AC (Semapi)", cidade: "Rio Branco", telefone: "(68) 3224-8786", email: "sema.car@ac.gov.br", endereco: "Rua Benjamim Constant, 856, Centro, Rio Branco/AC, CEP 69900-062" },
  { uf: "AL", orgao: "IMA/AL", cidade: "Maceió", telefone: "(82) 3512-5999", email: "gerff@ima.al.gov.br", endereco: "Av. Fernandes Lima, 679, Farol, Maceió/AL, CEP 57057-450" },
  { uf: "AP", orgao: "SEMA/AP", cidade: "Macapá", telefone: "(96) 98401-8019", email: "sema@sema.ap.gov.br", endereco: "Av. Mendonça Furtado, 53, Bairro Central, Macapá/AP, CEP 68900-060" },
  { uf: "AM", orgao: "SEMA/AM", cidade: "Manaus", telefone: "(92) 3659-1821", email: "protocolo@sema.am.gov.br", endereco: "Av. Mário Ypiranga Monteiro, 3280, Parque Dez, Manaus/AM, CEP 69050-030" },
  { uf: "BA", orgao: "INEMA", cidade: "Salvador", telefone: "(71) 3118-4509", email: "atendimento.seia@inema.ba.gov.br", endereco: "Av. Luís Viana Filho, 6ª Avenida, nº 600, CAB, Salvador/BA, CEP 41745-900" },
  { uf: "CE", orgao: "SEMACE", cidade: "Fortaleza", telefone: "(85) 3264-8117", email: "protocolo@semace.ce.gov.br", endereco: "Rua Jaime Benévolo, 1400, Bairro de Fátima, Fortaleza/CE, CEP 60050-155" },
  { uf: "DF", orgao: "IBRAM", cidade: "Brasília", telefone: "(61) 3214-5658", email: "dilam6@ibram.df.gov.br", endereco: "SEPN 511, Bloco C, Edifício Bittar, Brasília/DF, CEP 70750-543" },
  { uf: "ES", orgao: "IDAF", cidade: "Vitória", telefone: "(27) 3636-3803", email: "sreg@idaf.es.gov.br", endereco: "Av. Jerônimo Monteiro, 1000, Ed. Trade Center, Loja 01, Centro, Vitória/ES, CEP 29010-935" },
  { uf: "GO", orgao: "SEMAD/GO", cidade: "Goiânia", telefone: "(62) 98320-0171", email: "car.meioambiente@goias.gov.br", endereco: "Av. José Leandro da Cruz, 1578, Parque Amazônia, Goiânia/GO, CEP 74843-010" },
  { uf: "MA", orgao: "SEMA/MA", cidade: "São Luís", telefone: "(98) 3194-8900", email: "car@sema.ma.gov.br", endereco: "Av. dos Holandeses, Quadra 06, Edifício Manhattan, Calhau, São Luís/MA, CEP 65071-380" },
  { uf: "MT", orgao: "SEMA/MT", cidade: "Cuiabá", telefone: "(65) 3613-7200", email: "-", endereco: "Palácio Paiaguás, Rua C, Centro Político Administrativo, Cuiabá/MT, CEP 78050-970" },
  { uf: "MS", orgao: "IMASUL", cidade: "Campo Grande", telefone: "(67) 3318-6060", email: "carms@imasul.ms.gov.br", endereco: "Rua Desembargador Leão Neto do Carmo, s/n, Parque dos Poderes, Campo Grande/MS, CEP 79037-100" },
  { uf: "MG", orgao: "IEF", cidade: "Belo Horizonte", telefone: "-", email: "duv.sicarmg@meioambiente.mg.gov.br", endereco: "Rodovia Papa João Paulo II, 4143, Edifício Minas, Cidade Administrativa, Serra Verde, Belo Horizonte/MG, CEP 31630-900" },
  { uf: "PA", orgao: "SEMAS/PA", cidade: "Belém", telefone: "(91) 3184-3300", email: "protocolo@semas.pa.gov.br", endereco: "Travessa Lomas Valentinas, 2717, Belém/PA, CEP 66093-677" },
  { uf: "PB", orgao: "SUDEMA", cidade: "João Pessoa", telefone: "(83) 3218-5626", email: "carsudema@gmail.com", endereco: "Av. Monsenhor Walfredo Leal, 181, Tambiá, João Pessoa/PB, CEP 58020-540" },
  { uf: "PR", orgao: "IAT", cidade: "Curitiba", telefone: "(41) 3213-3700", email: "car@iap.pr.gov.br", endereco: "Rua Engenheiros Rebouças, 1206, Bairro Rebouças, Curitiba/PR, CEP 80215-100" },
  { uf: "PE", orgao: "CPRH", cidade: "Recife", telefone: "(81) 3182-8800", email: "ouvidoriaambiental@cprh.pe.gov.br", endereco: "Rua Oliveira Góes, 395, Poço da Panela, Recife/PE, CEP 52061-340" },
  { uf: "PI", orgao: "SEMARH/PI", cidade: "Teresina", telefone: "(86) 3221-4745", email: "car.pi@semar.pi.gov.br", endereco: "Av. Odilon Araújo, 1035, Piçarra, Teresina/PI, CEP 64017-280" },
  { uf: "RJ", orgao: "INEA", cidade: "Rio de Janeiro", telefone: "(21) 2332-5521", email: "car.gesef.inea@gmail.com", endereco: "Av. Venezuela, 110, Saúde, Rio de Janeiro/RJ, CEP 20081-312" },
  { uf: "RN", orgao: "IDEMA", cidade: "Natal", telefone: "(84) 3113-6100", email: "idemaemdia@gmail.com", endereco: "Av. Almirante Alexandrino de Alencar, 1397, Tirol, Natal/RN, CEP 59064-630" },
  { uf: "RS", orgao: "SEMA/RS", cidade: "Porto Alegre", telefone: "(51) 3288-7447", email: "atendimento-car@sema.rs.gov.br", endereco: "Av. Borges de Medeiros, 1501, 7º andar, Praia de Belas, Porto Alegre/RS, CEP 90119-900" },
  { uf: "RO", orgao: "SEDAM/RO", cidade: "Porto Velho", telefone: "(69) 3212-9665", email: "comrar@sedam.ro.gov.br", endereco: "Av. Farquar, 2986, Bairro Pedrinhas, Porto Velho/RO, CEP 76801-470" },
  { uf: "RR", orgao: "FEMARH/RR", cidade: "Boa Vista", telefone: "(95) 9146-0633", email: "gabinete.femarh@gmail.com", endereco: "Av. Ville Roy, 4935, São Pedro, Boa Vista/RR, CEP 69306-665" },
  { uf: "SC", orgao: "IMA/SC e SEMAE", cidade: "Florianópolis", telefone: "(48) 3665-4218", email: "car@semae.sc.gov.br", endereco: "Rod. Virgílio Várzea, 529, Bairro Monte Verde, Florianópolis/SC, CEP 88032-000" },
  { uf: "SP", orgao: "CATI/SAA-SP", cidade: "São Paulo", telefone: "(11) 5067-0136", email: "FaleCAR", endereco: "Praça Ramos de Azevedo, 254, Centro, São Paulo/SP, CEP 01037-912" },
  { uf: "SE", orgao: "ADEMA", cidade: "Aracaju", telefone: "(79) 3198-7150", email: "car@adema.se.gov.br", endereco: "Rua Vila Cristina, 1051, Bairro 13 de Julho, Aracaju/SE, CEP 49020-150" },
  { uf: "TO", orgao: "SEMARH/TO", cidade: "Palmas", telefone: "(63) 3218-7696", email: "car@semarh.to.gov.br", endereco: "Esplanada das Secretarias, Praça dos Girassóis, s/n, Centro, Palmas/TO, CEP 77001-002" },
];

export const beneficiosCAR = [
  "Conseguir financiamentos rurais",
  "Participar de programas ambientais",
  "Evitar problemas com órgãos de fiscalização",
  "Valorizar sua propriedade",
  "Ter mais segurança jurídica",
];

// Portfolio data — projects from the official SENAI Soluções Digitais site
// (senaisolucoesdigitais.com.br/projects.json). Kept faithful: same names,
// descriptions, tags, client, year and live URLs.
//
// `image` reuses the mockups bundled with the project (mapped by theme). Swap
// for real project screenshots when available.

import dashboardImg from "../assets/about/dashboard.png";
import portalImg from "../assets/about/portal.png";
import phonesImg from "../assets/about/phones.png";
import vrImg from "../assets/about/vr.png";
import edhealthImg from "../assets/services/edhealth.png";
import mobileImg from "../assets/services/mobile.png";
import ecommerceCursosImg from "../assets/services/ecommerce.jpg";

// Each project also carries the fields used by the dedicated detail page
// (route #/projetos/:slug), ported from the Figma "Página do produto
// específico": category, purpose (short intent line), challenge, solution and
// the technologies list.
export const projects = [
  {
    slug: "ecommerce-cursos",
    name: "E-commerce de Cursos",
    icon: "🛒",
    description:
      "Marketplace de educação da FIESC: catálogo, matrícula e pagamento 100% online para cursos do SESI e SENAI/SC.",
    tags: ["Desenvolvimento Web", "Big Data & Analytics"],
    client: "FIESC",
    year: "2024",
    liveUrl: "https://cursos.sesisenai.org.br/",
    image: ecommerceCursosImg,
    category: "E-commerce & Educação",
    purpose:
      "Vitrine digital que transforma a busca por qualificação em uma jornada de compra fluida: o aluno descobre, compara e se matricula em cursos técnicos, profissionalizantes e EAD do SESI e SENAI/SC em poucos cliques.",
    caption: "Da descoberta à matrícula, 100% online.",
    challenge:
      "A oferta educacional do SESI e SENAI/SC estava dispersa e a matrícula dependia de atendimento presencial ou telefônico, criando atrito, filas e perda de alunos justamente no momento da decisão de compra.",
    challengeExtra:
      "Sem uma vitrine unificada, era difícil divulgar promoções, comparar cursos por área e converter o interesse do visitante em matrícula efetiva de forma escalável em todo o estado.",
    solution:
      "Desenvolvemos um e-commerce completo que reúne todo o catálogo em um só lugar, com busca por área, filtros, cursos em destaque, campanhas promocionais e checkout com pagamento online. A jornada de matrícula ficou autônoma e disponível 24/7, e o time ganhou dados de comportamento para orientar campanhas — ampliando alcance, conversão e receita.",
    technologies: ["React", "Node.js", "REST API", "Gateway de Pagamento", "PostgreSQL", "AWS"],
  },
  {
    slug: "chatbot-sgn",
    name: "Chatbot SGN",
    icon: "🚀",
    description:
      "Chatbots personalizados a partir dos documentos do cliente, com interações automatizadas sob medida.",
    tags: ["Inteligência Artificial"],
    client: "DR SENAI",
    year: "2012 - 2026",
    liveUrl: "https://sgn.sesisenai.org.br",
    image: phonesImg,
    category: "Chatbot & IA",
    purpose:
      "Assistente conversacional que responde dúvidas a partir dos documentos oficiais do cliente, automatizando o atendimento com precisão e contexto.",
    caption: "Atendimento inteligente treinado nos seus documentos.",
    challenge:
      "As equipes de suporte lidavam com um alto volume de perguntas repetitivas, dispersas em manuais e documentos extensos, o que tornava o atendimento lento e sobrecarregava os especialistas.",
    challengeExtra:
      "Encontrar a resposta certa exigia navegar por múltiplos arquivos, gerando inconsistência nas respostas e tempo de espera elevado para os usuários finais.",
    solution:
      "Construímos um chatbot que ingere os documentos do cliente e responde em linguagem natural com base neles, usando recuperação semântica (RAG). O sistema entende o contexto da pergunta, cita as fontes e é personalizável para cada base de conhecimento — reduzindo drasticamente o tempo de atendimento.",
    technologies: ["Python", "LLM", "RAG", "React", "FastAPI", "PostgreSQL"],
  },
  {
    slug: "habilita",
    name: "Habilita IA",
    icon: "🚀",
    description:
      "Gera cards de diagnóstico para resolver gaps de competências dos trabalhadores da indústria.",
    tags: ["Inteligência Artificial", "Big Data & Analytics"],
    client: "FEPT",
    year: "2024",
    liveUrl: "https://habilita-ia-hml1.hml.sc.senai.br/login",
    image: dashboardImg,
    category: "IA & Gestão de Competências",
    purpose:
      "Plataforma que diagnostica lacunas de competências dos trabalhadores da indústria e sugere trilhas de desenvolvimento sob medida.",
    caption: "Mapeando e fechando gaps de competência na indústria.",
    challenge:
      "A indústria não tinha uma forma objetiva de identificar quais competências faltavam em seus times, dificultando o planejamento de capacitação e a alocação de recursos de treinamento.",
    challengeExtra:
      "Avaliações manuais eram demoradas, subjetivas e não escalavam para o volume de colaboradores das empresas atendidas.",
    solution:
      "Desenvolvemos uma solução que gera cards de diagnóstico com IA, cruzando o perfil do trabalhador com as competências exigidas pela função. A plataforma aponta os gaps de forma visual e recomenda ações de desenvolvimento, dando aos gestores uma visão clara e acionável.",
    technologies: ["React", "Node.js", "IA", "PostgreSQL", "Tailwind CSS"],
  },
  {
    slug: "hub-ia",
    name: "Hub IA",
    icon: "🧠",
    description:
      "Plataforma central que integra IA (chatbots, tradução, análise) a qualquer aplicação via uma única API.",
    tags: ["Inteligência Artificial", "Desenvolvimento Web"],
    client: null,
    year: "2024",
    liveUrl: null,
    image: portalImg,
    category: "Plataforma & API de IA",
    purpose:
      "Camada central que disponibiliza recursos de IA — chatbots, tradução e análise — para qualquer aplicação por meio de uma única API padronizada.",
    caption: "Uma única API para toda a inteligência artificial.",
    challenge:
      "Cada aplicação integrava serviços de IA de forma isolada, duplicando esforço, dispersando credenciais e dificultando a governança e o controle de custos entre os projetos.",
    challengeExtra:
      "A ausência de um ponto central tornava difícil trocar de provedor, padronizar respostas e monitorar o consumo de IA em toda a organização.",
    solution:
      "Criamos um hub que centraliza o acesso a múltiplos modelos e serviços de IA atrás de uma API única. As aplicações consomem chatbots, tradução e análise sem se preocupar com o provedor, com governança, cache e observabilidade centralizados — acelerando a adoção de IA em todo o ecossistema.",
    technologies: ["Node.js", "REST API", "LLM", "Docker", "Redis", "PostgreSQL"],
  },
  {
    slug: "predicao",
    name: "Predição de Evasão",
    icon: "🚀",
    description:
      "Análise preditiva que identifica com antecedência os alunos com maior risco de evasão escolar.",
    tags: ["Big Data & Analytics", "Inteligência Artificial"],
    client: "DR SESI/SENAI",
    year: "2019",
    liveUrl: null,
    image: dashboardImg,
    category: "Machine Learning & Educação",
    purpose:
      "Modelo preditivo que antecipa quais alunos têm maior risco de evasão, permitindo intervenções pedagógicas no momento certo.",
    caption: "Antecipando a evasão para agir antes que ela aconteça.",
    challenge:
      "As instituições só percebiam a evasão depois que ela ocorria, quando já não era possível reverter. Faltava um indicador antecipado de risco baseado nos dados dos alunos.",
    challengeExtra:
      "Os dados acadêmicos existiam, mas estavam dispersos e não eram usados de forma preditiva para orientar ações de retenção.",
    solution:
      "Treinamos modelos de machine learning sobre o histórico acadêmico e comportamental dos alunos para estimar a probabilidade de evasão. O sistema entrega um ranking de risco e os principais fatores associados, permitindo que a equipe pedagógica priorize e personalize as ações de retenção.",
    technologies: ["Python", "Machine Learning", "Pandas", "scikit-learn", "Dashboards"],
  },
  {
    slug: "saep",
    name: "SAEP IA",
    icon: "🚀",
    description:
      "IA generativa que auxilia na criação de itens do Sistema de Avaliação da Educação Profissional.",
    tags: ["Inteligência Artificial", "Desenvolvimento Web"],
    client: "DN SENAI",
    year: "2025",
    liveUrl: "https://saep-ia.sc.senai.br/",
    image: edhealthImg,
    category: "IA Generativa & Avaliação",
    purpose:
      "Assistente de IA generativa que apoia especialistas na elaboração de itens de avaliação alinhados às diretrizes do SAEP.",
    caption: "IA generativa a serviço da avaliação educacional.",
    challenge:
      "A criação de itens de avaliação de qualidade é um processo lento e altamente especializado, e a demanda por novos itens superava a capacidade das equipes de conteúdo.",
    challengeExtra:
      "Garantir aderência às diretrizes pedagógicas e evitar itens repetidos ou enviesados exigia revisões manuais extensas.",
    solution:
      "Desenvolvemos uma ferramenta de IA generativa que propõe itens de avaliação a partir das competências e diretrizes do SAEP. O especialista revisa e ajusta as sugestões, acelerando a produção sem abrir mão da qualidade e da conformidade pedagógica.",
    technologies: ["React", "Python", "LLM", "FastAPI", "Tailwind CSS"],
  },
  {
    slug: "sgn",
    name: "SGN",
    icon: "🚀",
    description:
      "Plataforma de Gestão do Negócio que gere toda a educação do SENAI e SESI de Santa Catarina.",
    tags: ["Desenvolvimento Web"],
    client: "DR SESI/SENAI",
    year: "2012",
    liveUrl: "https://sgn.sesisenai.org.br",
    image: portalImg,
    category: "Plataforma de Gestão (SaaS)",
    purpose:
      "Sistema de Gestão do Negócio que centraliza toda a operação educacional do SENAI e SESI de Santa Catarina em uma única plataforma.",
    caption: "A espinha dorsal da educação do SESI e SENAI/SC.",
    challenge:
      "A gestão educacional estava fragmentada em sistemas e processos distintos, dificultando a visão unificada da operação e gerando retrabalho entre unidades.",
    challengeExtra:
      "Matrículas, turmas, financeiro e acompanhamento pedagógico viviam em silos, exigindo integrações manuais e conciliações constantes.",
    solution:
      "Construímos uma plataforma robusta que integra toda a jornada educacional — da matrícula ao acompanhamento — em um único ambiente. O SGN unifica dados e processos de todas as unidades, dando gestão centralizada, confiável e escalável para toda a rede em Santa Catarina.",
    technologies: ["Java", "Angular", "PostgreSQL", "REST API", "Docker", "AWS"],
  },
];

/** Look up a single project by its slug (used by the detail page). */
export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

/**
 * Filter categories shown in the "Filtrar por área" sidebar.
 *
 * Fixed, curated list (no longer auto-derived from tags) so the areas match
 * the business taxonomy. Each project's `tags` uses these exact labels, so
 * `p.tags.includes(area)` in Portfolio.jsx filters correctly.
 */
export const categories = [
  { id: "todos", label: "Todos" },
  { id: "Inteligência Artificial", label: "Inteligência Artificial" },
  { id: "Realidades Estendidas", label: "Realidades Estendidas" },
  { id: "Desenvolvimento Web", label: "Desenvolvimento Web" },
  { id: "Desenvolvimento Mobile", label: "Desenvolvimento Mobile" },
  { id: "Big Data & Analytics", label: "Big Data & Analytics" },
];

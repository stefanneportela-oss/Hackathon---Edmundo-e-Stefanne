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

export const projects = [
  {
    slug: "chatbot-sgn",
    name: "Chatbot SGN",
    icon: "🚀",
    description:
      "Chatbots personalizados a partir dos documentos do cliente, com interações automatizadas sob medida.",
    tags: ["Educação", "Chatbot", "IA"],
    client: "DR SENAI",
    year: "2012 - 2026",
    liveUrl: "https://sgn.sesisenai.org.br",
    image: phonesImg,
  },
  {
    slug: "habilita",
    name: "Habilita IA",
    icon: "🚀",
    description:
      "Gera cards de diagnóstico para resolver gaps de competências dos trabalhadores da indústria.",
    tags: ["IA", "Gestão"],
    client: "FEPT",
    year: "2024",
    liveUrl: "https://habilita-ia-hml1.hml.sc.senai.br/login",
    image: dashboardImg,
  },
  {
    slug: "hub-ia",
    name: "Hub IA",
    icon: "🧠",
    description:
      "Plataforma central que integra IA (chatbots, tradução, análise) a qualquer aplicação via uma única API.",
    tags: ["IA"],
    client: null,
    year: "2024",
    liveUrl: null,
    image: portalImg,
  },
  {
    slug: "predicao",
    name: "Predição de Evasão",
    icon: "🚀",
    description:
      "Análise preditiva que identifica com antecedência os alunos com maior risco de evasão escolar.",
    tags: ["IA", "Predição", "Educação"],
    client: "DR SESI/SENAI",
    year: "2019",
    liveUrl: null,
    image: dashboardImg,
  },
  {
    slug: "saep",
    name: "SAEP IA",
    icon: "🚀",
    description:
      "IA generativa que auxilia na criação de itens do Sistema de Avaliação da Educação Profissional.",
    tags: ["Educação", "IA"],
    client: "DN SENAI",
    year: "2025",
    liveUrl: "https://saep-ia.sc.senai.br/",
    image: edhealthImg,
  },
  {
    slug: "sgn",
    name: "SGN",
    icon: "🚀",
    description:
      "Plataforma de Gestão do Negócio que gere toda a educação do SENAI e SESI de Santa Catarina.",
    tags: ["Educação", "Gestão"],
    client: "DR SESI/SENAI",
    year: "2012",
    liveUrl: "https://sgn.sesisenai.org.br",
    image: portalImg,
  },
];

/** Filter categories built from the real project tags. "Todos" first. */
export const categories = [
  { id: "todos", label: "Todos" },
  ...Array.from(new Set(projects.flatMap((p) => p.tags))).map((tag) => ({
    id: tag,
    label: tag,
  })),
];

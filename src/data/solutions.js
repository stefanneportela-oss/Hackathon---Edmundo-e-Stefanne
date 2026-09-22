// Digital solutions / products showcased in the Hero 3D arc carousel.
// Portrait (3:4) placeholders — swap `src` for real SENAI product mockups
// (dashboards, mobile app screens, web portals) when available.
const u = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&h=800&q=80`;

export const solutions = [
  {
    id: 1,
    tag: "Inteligência Artificial",
    title: "Visão Computacional",
    desc: "Detecção de defeitos em linha de produção em tempo real.",
    src: u("photo-1518770660439-4636190af475"),
  },
  {
    id: 2,
    tag: "Automação",
    title: "RPA & Orquestração",
    desc: "Automação de fluxos que reduz retrabalho e custos.",
    src: u("photo-1551288049-bebda4e38f71"),
  },
  {
    id: 3,
    tag: "Big Data",
    title: "Dados & BI",
    desc: "Dashboards que transformam dados em decisão.",
    src: u("photo-1460925895917-afdab827c52f"),
  },
  {
    id: 4,
    tag: "Mobile",
    title: "Apps Industriais",
    desc: "Aplicativos de chão de fábrica com sync offline.",
    src: u("photo-1512941937669-90a1b58e7e9c"),
  },
  {
    id: 5,
    tag: "Web",
    title: "Portais & Sistemas",
    desc: "Sistemas web escaláveis sob medida.",
    src: u("photo-1547658719-da2b51169166"),
  },
  {
    id: 6,
    tag: "IoT",
    title: "Monitoramento IoT",
    desc: "Sensores conectados e telemetria em nuvem.",
    src: u("photo-1558494949-ef010cbdcc31"),
  },
  {
    id: 7,
    tag: "Cloud",
    title: "Infra em Nuvem",
    desc: "Arquiteturas escaláveis e resilientes na nuvem.",
    src: u("photo-1451187580459-43490279c0fa"),
  },
  {
    id: 8,
    tag: "UX / UI",
    title: "Design de Produto",
    desc: "Interfaces centradas no usuário para a indústria.",
    src: u("photo-1523726491678-bf852e717f6a"),
  },
];

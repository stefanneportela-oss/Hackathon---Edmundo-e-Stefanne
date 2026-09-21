// Digital solutions / products showcased in the Hero carousel.
// Images are Unsplash placeholders in a consistent landscape ratio —
// swap the `src` values for real SENAI project screenshots later.
const u = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=720&h=520&q=80`;

export const solutions = [
  {
    id: 1,
    tag: "Inteligência Artificial",
    title: "Visão Computacional Industrial",
    desc: "Detecção de defeitos em linha de produção em tempo real com deep learning.",
    src: u("photo-1518770660439-4636190af475"),
  },
  {
    id: 2,
    tag: "Automação de Processos",
    title: "RPA & Orquestração",
    desc: "Automação de fluxos operacionais que reduz retrabalho e custos.",
    src: u("photo-1551288049-bebda4e38f71"),
  },
  {
    id: 3,
    tag: "Big Data",
    title: "Plataforma de Dados & BI",
    desc: "Dashboards analíticos que transformam dados em decisão.",
    src: u("photo-1460925895917-afdab827c52f"),
  },
  {
    id: 4,
    tag: "Aplicações Mobile",
    title: "Apps Industriais Mobile",
    desc: "Aplicativos de chão de fábrica com sincronização offline.",
    src: u("photo-1512941937669-90a1b58e7e9c"),
  },
  {
    id: 5,
    tag: "Desenvolvimento Web",
    title: "Portais & Sistemas Web",
    desc: "Sistemas web escaláveis sob medida para a indústria.",
    src: u("photo-1547658719-da2b51169166"),
  },
  {
    id: 6,
    tag: "IoT",
    title: "Monitoramento IoT",
    desc: "Sensores conectados e telemetria de equipamentos em nuvem.",
    src: u("photo-1558494949-ef010cbdcc31"),
  },
];

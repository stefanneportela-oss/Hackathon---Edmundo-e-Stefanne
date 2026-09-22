// Services / "O Que Fazemos" content.
// The first entry is the featured card (banner image + overlay + long copy);
// the rest are standard service cards (title, separator, short copy, action).
const banner = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=600&q=80`;

export const services = [
  {
    id: 1,
    featured: true,
    banner: banner("photo-1620712943543-bcc4688e7485"), // 3D tech / blue render
    overlay: "Impulsionamos o Seu Negócio",
    title: "Transformação Digital",
    desc: "Do diagnóstico à entrega, concebemos e implementamos plataformas digitais completas que colocam a sua operação anos à frente da concorrência — com engenharia de ponta e design centrado no usuário.",
  },
  {
    id: 2,
    featured: false,
    title: "Desenvolvimento Web & Portais",
    desc: "Sistemas e portais escaláveis, rápidos e sob medida, construídos com as tecnologias web mais modernas.",
  },
  {
    id: 3,
    featured: false,
    title: "Infraestrutura em Nuvem",
    desc: "Arquiteturas cloud resilientes, seguras e elásticas que crescem junto com a sua demanda.",
  },
  {
    id: 4,
    featured: false,
    title: "Inteligência Artificial",
    desc: "Modelos de IA e visão computacional que automatizam processos e geram decisões orientadas por dados.",
  },
];

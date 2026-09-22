// Services / "O Que Fazemos" content.
// Every card shares the same anatomy. In the DEFAULT state it shows only the
// title, a separator and a short copy. On HOVER a 3D-tech banner image slides
// in (with an icon + overlay headline), per the reference.
const banner = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=600&q=80`;

export const services = [
  {
    id: 1,
    title: "Transformação Digital",
    desc: "Do diagnóstico à entrega, concebemos plataformas digitais completas que colocam a sua operação anos à frente da concorrência.",
    overlay: "Impulsionamos o Seu Negócio",
    banner: banner("photo-1620712943543-bcc4688e7485"),
  },
  {
    id: 2,
    title: "Desenvolvimento Web & Portais",
    desc: "Sistemas e portais escaláveis, rápidos e sob medida, construídos com as tecnologias web mais modernas.",
    overlay: "Web do Jeito Certo",
    banner: banner("photo-1547658719-da2b51169166"),
  },
  {
    id: 3,
    title: "Infraestrutura em Nuvem",
    desc: "Arquiteturas cloud resilientes, seguras e elásticas que crescem junto com a sua demanda.",
    overlay: "Escale Sem Limites",
    banner: banner("photo-1451187580459-43490279c0fa"),
  },
  {
    id: 4,
    title: "Inteligência Artificial",
    desc: "Modelos de IA e visão computacional que automatizam processos e geram decisões orientadas por dados.",
    overlay: "Decisões Inteligentes",
    banner: banner("photo-1620712943543-bcc4688e7485"),
  },
];

// Services / "O Que Fazemos" content.
// Every card shares the same anatomy. In the DEFAULT state it shows only the
// title, a separator and a short copy. On HOVER a 3D-tech banner image slides
// in (with an icon + overlay headline), per the reference.
const banner = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=600&q=80`;

export const services = [
  {
    id: 1,
    title: "Inteligência Artificial",
    desc: "Desenvolvemos modelos preditivos, automação inteligente e soluções de visão computacional.",
    overlay: "Decisões Inteligentes",
    banner: banner("photo-1620712943543-bcc4688e7485"),
  },
  {
    id: 2,
    title: "Realidade Estendida",
    desc: "Experiências imersivas com AR, VR e simulações 3D para treinamento e engajamento.",
    overlay: "Experiências Imersivas",
    banner: banner("photo-1592478411213-6153e4ebc07d"),
  },
  {
    id: 3,
    title: "Desenvolvimento Mobile",
    desc: "Apps nativos e multiplataforma para iOS e Android com foco em performance.",
    overlay: "Apps de Alta Performance",
    banner: banner("photo-1512941937669-90a1b58e7e9c"),
  },
  {
    id: 4,
    title: "EdTech & HealthTech",
    desc: "Soluções especializadas para educação e saúde com foco em gestão e cuidado.",
    overlay: "Educação e Saúde Conectadas",
    banner: banner("photo-1576091160399-112ba8d25d1f"),
  },
  {
    id: 5,
    title: "Desenvolvimento Web",
    desc: "Plataformas web modernas e responsivas com performance e segurança.",
    overlay: "Web do Jeito Certo",
    banner: banner("photo-1547658719-da2b51169166"),
  },
  {
    id: 6,
    title: "Big Data & Analytics",
    desc: "Análise de grandes volumes de dados para insights estratégicos e dashboards.",
    overlay: "Insights que Guiam Decisões",
    banner: banner("photo-1551288049-bebda4e38f71"),
  },
];

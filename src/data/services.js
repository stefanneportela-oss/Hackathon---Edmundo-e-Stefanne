// Services / "O Que Fazemos" content.
// Every card shares the same anatomy. In the DEFAULT state it shows only the
// title, a separator and a short copy. On HOVER a 3D-tech banner image slides
// in (with an icon + overlay headline), per the reference.
import eeCelularBanner from "../assets/services/ee-celular.png";
import orbieBanner from "../assets/services/orbie.svg";
import vrBanner from "../assets/services/vr.svg";
import avaBanner from "../assets/services/ava.svg";
import habilitaBanner from "../assets/services/habilita.svg";

const banner = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=600&q=80`;

export const services = [
  {
    id: 1,
    icon: "ai",
    title: "Inteligência Artificial",
    desc: "Desenvolvemos modelos preditivos, automação inteligente e soluções de visão computacional.",
    overlay: "Decisões Inteligentes",
    banner: habilitaBanner,
  },
  {
    id: 2,
    icon: "xr",
    title: "Realidade Estendida",
    desc: "Experiências imersivas com AR, VR e simulações 3D para treinamento e engajamento.",
    overlay: "Experiências Imersivas",
    banner: vrBanner,
  },
  {
    id: 3,
    icon: "mobile",
    title: "Desenvolvimento Mobile",
    desc: "Apps nativos e multiplataforma para iOS e Android com foco em performance.",
    overlay: "Apps de Alta Performance",
    banner: orbieBanner,
  },
  {
    id: 4,
    icon: "edhealth",
    title: "EdTech & HealthTech",
    desc: "Soluções especializadas para educação e saúde com foco em gestão e cuidado.",
    overlay: "Educação e Saúde Conectadas",
    banner: eeCelularBanner,
  },
  {
    id: 5,
    icon: "web",
    title: "Desenvolvimento Web",
    desc: "Plataformas web modernas e responsivas com performance e segurança.",
    overlay: "Web do Jeito Certo",
    banner: avaBanner,
  },
  {
    id: 6,
    icon: "data",
    title: "Big Data & Analytics",
    desc: "Análise de grandes volumes de dados para insights estratégicos e dashboards.",
    overlay: "Insights que Guiam Decisões",
    banner: banner("photo-1551288049-bebda4e38f71"),
  },
];

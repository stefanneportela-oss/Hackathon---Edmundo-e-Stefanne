import Header from "./components/Header.jsx";
// Hero antigo preservado — troque HeroV2 por Hero abaixo para voltar à versão original.
// import Hero from "./components/Hero.jsx";
import HeroV2 from "./components/HeroV2.jsx";
import SocialProof from "./components/SocialProof.jsx";
import TextReveal from "./components/TextReveal.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import About from "./components/About.jsx";
import Careers from "./components/Careers.jsx";
import Contact from "./components/Contact.jsx";
import MotionToggle from "./components/MotionToggle.jsx";
import GlobalBackground from "./components/GlobalBackground.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* One continuous, infinite background behind every section */}
      <GlobalBackground />

      {/* Foreground content sits above the fixed background */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroV2 />
          <SocialProof />
          <TextReveal />
          <Services />
          <Projects />
          <About />
          <Careers />
          <Contact />
        </main>
        <MotionToggle />
      </div>
    </div>
  );
}

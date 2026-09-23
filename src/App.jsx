import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import HeroV2 from "./components/HeroV2.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import About from "./components/About.jsx";
import MotionToggle from "./components/MotionToggle.jsx";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-ink text-white">
      <Header />
      <main>
        <Hero />
        {/* Experimental second hero for testing */}
        <HeroV2 />
        <Services />
        <Projects />
        <About />
      </main>
      <MotionToggle />
    </div>
  );
}

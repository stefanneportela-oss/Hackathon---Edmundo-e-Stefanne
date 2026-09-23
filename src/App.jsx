import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import About from "./components/About.jsx";
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
          <Hero />
          <Services />
          <Projects />
          <About />
        </main>
        <MotionToggle />
      </div>
    </div>
  );
}

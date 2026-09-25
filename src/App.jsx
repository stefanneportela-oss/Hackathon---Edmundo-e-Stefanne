import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
// Hero antigo preservado — troque HeroV2 por Hero abaixo para voltar à versão original.
// import Hero from "./components/Hero.jsx";
import HeroV2 from "./components/HeroV2.jsx";
import SocialProof from "./components/SocialProof.jsx";
import TextReveal from "./components/TextReveal.jsx";
import Services from "./components/Services.jsx";
import AwsPartner from "./components/AwsPartner.jsx";
import Projects from "./components/Projects.jsx";
import About from "./components/About.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Careers from "./components/Careers.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import MotionToggle from "./components/MotionToggle.jsx";
import GlobalBackground from "./components/GlobalBackground.jsx";
import Portfolio from "./components/Portfolio.jsx";
import AwsPartnership from "./components/AwsPartnership.jsx";

/**
 * Lightweight hash-based router.
 *
 * We use the URL hash (#/projetos) rather than the History API so the site
 * keeps working on any static host (Vercel, GitHub Pages) with no server
 * rewrite config and no broken refresh on sub-routes. Returns the current
 * route path, e.g. "/" or "/projetos".
 */
function useHashRoute() {
  const read = () => {
    const h = window.location.hash.replace(/^#/, "");
    return h || "/";
  };
  const [route, setRoute] = useState(() =>
    typeof window === "undefined" ? "/" : read()
  );

  useEffect(() => {
    const onChange = () => {
      const next = read();
      setRoute(next);

      // Route links start with "/" (e.g. "/projetos") → jump to the top.
      // Section anchors (e.g. "servicos") → let the browser scroll to the
      // element once the landing page has rendered.
      if (next.startsWith("/")) {
        window.scrollTo({ top: 0, behavior: "auto" });
      } else {
        // Defer so the target section is mounted before scrolling to it.
        requestAnimationFrame(() => {
          const el = document.getElementById(next);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export default function App() {
  const route = useHashRoute();
  const isPortfolio = route.startsWith("/projetos");
  const isAwsPartnership = route.startsWith("/parceria-aws");

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* One continuous, infinite background behind every section */}
      <GlobalBackground />

      {/* Foreground content sits above the fixed background */}
      <div className="relative z-10">
        <Header />
        {isPortfolio ? (
          <Portfolio />
        ) : isAwsPartnership ? (
          <AwsPartnership />
        ) : (
          <main>
            <HeroV2 />
            <SocialProof />
            <TextReveal />
            <Services />
            <AwsPartner />
            <Projects />
            <About />
            <Testimonials />
            <Careers />
            <Contact />
          </main>
        )}
        <Footer />
        <MotionToggle />
      </div>
    </div>
  );
}

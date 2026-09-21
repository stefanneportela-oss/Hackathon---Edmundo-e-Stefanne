import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-ink text-white">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}

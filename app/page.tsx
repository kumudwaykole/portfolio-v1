import HeroSection from "./components/herosection";
import { About } from "./components/about";
import { Projects } from "./components/projects";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <Projects />
      <Footer />
    </main>
  );
}

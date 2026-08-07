import HeroSection from "./components/herosection";
import { Projects } from "./components/projects";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Projects />
      <Footer />
    </main>
  );
}

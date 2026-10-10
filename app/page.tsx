import type { Metadata } from "next";
import HeroSection from "./components/herosection";
import { About } from "./components/about";
import { Projects } from "./components/projects";
import { Footer } from "./components/footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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

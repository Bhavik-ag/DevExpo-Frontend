import Features from "./components/Features";
import Hero from "./components/Hero";
import Team from "./components/Team";

export default function Home() {
  return (
    <main className="flex flex-grow flex-shrink flex-col items-center">
      <Hero />
      <Features />
      <Team />
    </main>
  );
}

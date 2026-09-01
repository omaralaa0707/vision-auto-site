import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Floor } from "@/components/site/floor";
import { Plans } from "@/components/site/plans";
import { Showroom } from "@/components/site/showroom";
import { Visit, Footer } from "@/components/site/visit";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Floor />
        <Plans />
        <Showroom />
        <Visit />
      </main>
      <Footer />
    </>
  );
}

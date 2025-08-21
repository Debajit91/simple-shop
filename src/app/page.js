import HighlightsProducts from "@/components/HighlightsProducts";
import Hero from "../components/Hero";
import Categories from "@/components/Categories";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HighlightsProducts/>
      <Categories/>
      <About/>
      <Testimonials/>
      <FAQ/>
    </>
  );
}

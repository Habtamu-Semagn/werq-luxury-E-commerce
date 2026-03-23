import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import BrandStory from "@/components/sections/BrandStory";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <Hero />
      <CategoryShowcase />
      <BrandStory />
      <ProductGrid />
      <Newsletter />
      <Footer />
    </main>
  );
}

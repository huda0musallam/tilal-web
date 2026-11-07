import Hero from "@/features/home/Hero";
import Story from "@/features/home/Story";
import RoastLevels from "@/features/home/RoastLevels";
import FeaturedProducts from "@/features/products/FeaturedProducts";
import BlendTeaser from "@/features/home/BlendTeaser";
import BrewingPreview from "@/features/brewing/BrewingPreview";
import Reviews from "@/features/reviews/Reviews";
import SuggestionBox from "@/features/suggestions/SuggestionBox";

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <RoastLevels />
      <FeaturedProducts />
      <BlendTeaser />
      <BrewingPreview />
      <Reviews />
      <SuggestionBox />
    </main>
  );
}

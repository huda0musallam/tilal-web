import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import Story from "@/components/home/Story";
import RoastLevels from "@/components/home/RoastLevels";
import FeaturedProducts, {
  FeaturedProductsSkeleton,
} from "@/components/home/FeaturedProducts";
import BlendTeaser from "@/components/home/BlendTeaser";
import BrewingPreview from "@/components/home/BrewingPreview";
import Reviews from "@/components/home/Reviews";
import SuggestionBox from "@/components/home/SuggestionBox";

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <RoastLevels />
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <BlendTeaser />
      <BrewingPreview />
      <Suspense fallback={null}>
        <Reviews />
      </Suspense>
      <SuggestionBox />
    </main>
  );
}

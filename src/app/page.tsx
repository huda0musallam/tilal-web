import { SWRConfig } from "swr";
import { apiKeys } from "@/lib/client";
import Hero from "@/features/home/Hero";
import Story from "@/features/home/Story";
import RoastLevels from "@/features/home/RoastLevels";
import FeaturedProducts from "@/features/products/FeaturedProducts";
import { getProducts } from "@/features/products/products.api";
import BlendTeaser from "@/features/home/BlendTeaser";
import BrewingPreview from "@/features/brewing/BrewingPreview";
import Reviews from "@/features/reviews/Reviews";
import { getReviews } from "@/features/reviews/reviews.api";
import SuggestionBox from "@/features/suggestions/SuggestionBox";

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <RoastLevels />
      <SWRConfig
        value={{
          fallback: {
            [apiKeys.products]: getProducts(),
            [apiKeys.reviews]: getReviews(),
          },
        }}
      >
        <FeaturedProducts />
        <BlendTeaser />
        <BrewingPreview />
        <Reviews />
      </SWRConfig>
      <SuggestionBox />
    </main>
  );
}

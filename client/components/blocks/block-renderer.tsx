import { Block } from "@/types";
import HeroBlock from "./hero-block";
import DestinationsBlock from "./destinations-block";
import TestimonialsBlock from "./testinomials-block";
import GalleryBlock from "./gallery-block";
import FeaturesBlock from "./features-block";
import CTABlock from "./cta-block";

interface BlockRendererProps {
  block: Block;
}

export default function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case "hero":
      return <HeroBlock block={block} />;
    case "destinations":
      return <DestinationsBlock block={block} />;
    case "testimonials":
      return <TestimonialsBlock block={block} />;
    case "gallery":
      return <GalleryBlock block={block} />;
    case "features":
      return <FeaturesBlock block={block} />;
    case "cta":
      return <CTABlock block={block} />;
    default:
      return (
        <div className="p-8 bg-gray-100 border-2 border-dashed border-gray-300 text-center">
          <p className="text-gray-600">Unknown block type: {block.type}</p>
        </div>
      );
  }
}

import { Block } from "@/types";
import { ArrowRight } from "lucide-react";

interface CTABlockProps {
  block: Block;
}

export default function CTABlock({ block }: CTABlockProps) {
  const { content, style } = block;

  return (
    <div
      className="relative overflow-hidden"
      style={{ padding: style.padding || "5rem 0" }}
    >
      {/* Background Image */}
      {content.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${content.backgroundImage})`,
          }}
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: style.overlayOpacity || 0.6 }}
      />

      {/* Content */}
      <div className="relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
            style={{
              color: style.textColor || "#ffffff",
              textAlign: style.alignment || "center",
            }}
          >
            {content.title}
          </h2>

          {content.subtitle && (
            <p
              className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto"
              style={{
                color: style.textColor || "#ffffff",
                textAlign: style.alignment || "center",
              }}
            >
              {content.subtitle}
            </p>
          )}

          {content.buttonText && (
            <a
              href={content.buttonLink || "#"}
              className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200 group"
            >
              {content.buttonText}
              <ArrowRight
                size={20}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

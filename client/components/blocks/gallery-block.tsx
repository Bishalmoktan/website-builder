import { Block } from "@/types";
import { Camera } from "lucide-react";

interface GalleryBlockProps {
  block: Block;
}

export default function GalleryBlock({ block }: GalleryBlockProps) {
  const { content, style } = block;

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
        </div>

        {style.layout === "grid" && (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
              gap: style.spacing || "1rem",
            }}
          >
            {content.images?.map((image: any) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-lg bg-gray-100 aspect-video"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {image.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="font-semibold">{image.caption}</h4>
                    </div>
                  </div>
                )}

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Camera size={16} className="text-gray-700" />
                  </div>
                </div>
              </div>
            )) || (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No images configured</p>
              </div>
            )}
          </div>
        )}

        {style.layout === "masonry" && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {content.images?.map((image: any) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-lg bg-gray-100 mb-4 break-inside-avoid"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {image.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="font-semibold">{image.caption}</h4>
                    </div>
                  </div>
                )}
              </div>
            )) || (
              <div className="text-center py-8">
                <p className="text-gray-500">No images configured</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

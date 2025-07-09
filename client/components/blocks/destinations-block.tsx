import { Block } from "@/types";
import { MapPin, ArrowRight } from "lucide-react";

interface DestinationsBlockProps {
  block: Block;
}

export default function DestinationsBlock({ block }: DestinationsBlockProps) {
  const { content, style } = block;

  return (
    <div
      className="py-16 px-6"
      style={{ backgroundColor: style.backgroundColor || "#f8fafc" }}
      id={block.type}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
        </div>

        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: `repeat(${Math.min(
              style.columns || 3,
              content.destinations?.length || 3
            )}, 1fr)`,
            gap: style.spacing || "2rem",
          }}
        >
          {content.destinations?.map((destination: any) => (
            <div
              key={destination.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-semibold text-gray-900">
                    {destination.price}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin size={16} className="text-sky-600 mr-1" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {destination.name}
                  </h3>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <button className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium group">
                  Learn More
                  <ArrowRight
                    size={16}
                    className="ml-1 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          )) || (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No destinations configured</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

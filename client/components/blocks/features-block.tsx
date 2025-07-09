import { Block } from "@/types";
import {
  Compass,
  Plane,
  Calendar,
  Star,
  MapPin,
  Users,
  Shield,
  Clock,
} from "lucide-react";

interface FeaturesBlockProps {
  block: Block;
}

const iconMap = {
  Compass: Compass,
  Plane: Plane,
  Calendar: Calendar,
  Star: Star,
  MapPin: MapPin,
  Users: Users,
  Shield: Shield,
  Clock: Clock,
};

export default function FeaturesBlock({ block }: FeaturesBlockProps) {
  const { content, style } = block;

  return (
    <div
      className="py-16 px-6"
      style={{ backgroundColor: style.backgroundColor || "#f1f5f9" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
        </div>

        <div
          className={`grid gap-8 ${
            style.layout === "horizontal"
              ? "md:grid-cols-3"
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {content.features?.map((feature: any) => {
            const IconComponent =
              iconMap[feature.icon as keyof typeof iconMap] || Star;

            return (
              <div
                key={feature.id}
                className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center">
                    <IconComponent
                      size={parseInt(style.iconSize) || 24}
                      className="text-sky-600"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          }) || (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No features configured</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

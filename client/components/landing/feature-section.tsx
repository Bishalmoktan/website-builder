import { Palette, Globe, Zap, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Palette,
    title: "Beautiful Templates",
    description:
      "Choose from stunning travel-themed templates designed to captivate your audience.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Build your travel website in minutes, not hours. Our intuitive builder makes it effortless.",
  },
  {
    icon: Globe,
    title: "Mobile Ready",
    description:
      "All websites are fully responsive and optimized for every device and screen size.",
  },
  {
    icon: Users,
    title: "SEO Optimized",
    description:
      "Built-in SEO features to help your travel site rank higher in search results.",
  },
];

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Everything You Need to Build Amazing Travel Sites
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Powerful features designed specifically for travel and hospitality
            websites
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardHeader className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

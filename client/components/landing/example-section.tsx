import { Check } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const examples = [
  {
    title: "Adventure Blog",
    description: "Perfect for travel bloggers and adventurers",
    image: "🏔️",
    features: ["Photo galleries", "Blog posts", "Travel maps"],
  },
  {
    title: "Travel Agency",
    description: "Showcase tours and packages beautifully",
    image: "✈️",
    features: ["Tour listings", "Booking forms", "Customer reviews"],
  },
  {
    title: "Hotel & Resort",
    description: "Stunning hospitality website templates",
    image: "🏨",
    features: ["Room galleries", "Reservation system", "Guest testimonials"],
  },
];

export default function ExampleSection() {
  return (
    <section id="examples" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Choose Your Perfect Template
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Professional templates tailored for different types of travel
            businesses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <Card
              key={index}
              className="group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <CardHeader className="text-center space-y-4">
                <div className="text-6xl mx-auto">{example.image}</div>
                <div>
                  <CardTitle className="text-xl mb-2">
                    {example.title}
                  </CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {example.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2 text-sm text-gray-700"
                    >
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300"
                >
                  Preview Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

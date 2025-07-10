import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Travel Blogger",
      content:
        "This builder helped me create a stunning travel blog in just 30 minutes. Amazing!",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Adventure Guide",
      content:
        "Perfect for showcasing my adventure tours. The templates are absolutely gorgeous.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "Travel Agency Owner",
      content:
        "Our bookings increased by 200% after switching to a site built with this tool.",
      rating: 5,
    },
  ];
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Loved by Travel Professionals
          </h2>
          <p className="text-xl text-gray-500">
            See what our users are saying about TravelBuilder
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 shadow-md"
            >
              <CardContent className="space-y-4 pt-6">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-indigo-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Block } from "@/types";
import { Star, Quote } from "lucide-react";

interface TestimonialsBlockProps {
  block: Block;
}

export default function TestimonialsBlock({ block }: TestimonialsBlockProps) {
  const { content, style } = block;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div
      className="py-16 px-6"
      style={{ backgroundColor: style.backgroundColor || "#ffffff" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {content.testimonials?.map((testimonial: any) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-8 relative"
            >
              <div className="absolute top-6 left-6 text-sky-600 opacity-20">
                <Quote size={32} />
              </div>

              <div className="relative">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )) || (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No testimonials configured</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

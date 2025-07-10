import Image from "next/image";
import { ArrowRight, Play, Check } from "lucide-react";

import heroImage from "@/assets/hero.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-5"></div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Badge variant="secondary" className="animate-bounce">
                ✨ New: AI-Powered Templates
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Build Stunning{" "}
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Travel Websites
                </span>{" "}
                in Minutes
              </h1>

              <p className="text-xl text-gray-500 leading-relaxed">
                Create beautiful, professional travel websites without any
                coding. Perfect for bloggers, agencies, and hospitality
                businesses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse"
              >
                <Link href={"/auth/signin"}>
                  <Play className="h-5 w-5" />
                  Start Building Now
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <a href="#examples">
                  View Examples
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>No coding required</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>Mobile responsive</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-green-500" />
                <span>SEO optimized</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-scale">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 rounded-3xl transform rotate-6 opacity-20"></div>

            <Image
              src={heroImage}
              alt="Travel website builder interface"
              className="relative rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

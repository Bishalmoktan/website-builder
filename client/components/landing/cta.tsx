import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-10"></div>
      <div className="container mx-auto px-4 text-center space-y-8 relative">
        <h2 className="text-3xl lg:text-5xl font-bold">
          Ready to Build Your Dream Travel Website?
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Join thousands of travel professionals who trust TravelBuilder for
          their online presence
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/signin"
            className="bg-indigo-600 text-white text-lg font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 animate-pulse flex items-center gap-2"
          >
            Start Your Free Trial
            <ArrowRight className="h-5 w-5" />
          </Link>
          <button className="border border-gray-300 text-gray-800 text-lg font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors">
            Schedule a Demo
          </button>
        </div>
        <p className="text-sm text-gray-500">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}

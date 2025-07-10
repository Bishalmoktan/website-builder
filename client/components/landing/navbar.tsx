import { ArrowRight, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-indigo-600" />
          <span className="text-xl font-bold bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            TravelBuilder
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <a href="#features">Features</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#examples">Examples</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#pricing">Pricing</a>
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link href={"/auth/signin"}>
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

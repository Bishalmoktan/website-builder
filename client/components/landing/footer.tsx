import { Globe } from "lucide-react";
import Logo from "../logo";

export default function Footer() {
  return (
    <footer className="border-t bg-white/5 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-500">
              The easiest way to create stunning travel websites without any
              coding knowledge.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <div>Features</div>
              <div>Templates</div>
              <div>Pricing</div>
              <div>API</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <div>Documentation</div>
              <div>Tutorials</div>
              <div>Blog</div>
              <div>Support</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <div>About</div>
              <div>Contact</div>
              <div>Privacy</div>
              <div>Terms</div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          © 2024 TravelBuilder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

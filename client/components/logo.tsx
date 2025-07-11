import { Palette } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/dashboard"} className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          WebCraft
        </h1>
      </div>
    </Link>
  );
}

"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../logo";
import UserProfile from "./user-profile-dropdown";
import { Theme, Website } from "@/types";
import { createWebsite } from "@/lib/service/website.service";
import { AxiosError } from "axios";
import { toast } from "sonner";
import useWebsiteStore from "@/store/use-website-store";
import { useRouter } from "next/navigation";

const defaultTheme: Theme = {
  primaryColor: "#0EA5E9",
  secondaryColor: "#F97316",
  fontFamily: "Inter",
  backgroundColor: "#ffffff",
};

export default function Navbar() {
  const { setCurrentWebsite } = useWebsiteStore();
  const router = useRouter();
  const handleCreateWebsite = async () => {
    const newWebsite = {
      title: "My Travel Website",
      blocks: [],
      theme: defaultTheme,
    };

    try {
      const res = await createWebsite(newWebsite);
      setCurrentWebsite(res.data);
      router.push(`/editor/${res.data._id}`);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleCreateWebsite}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Website
            </Button>

            <UserProfile />
          </div>
        </div>
      </div>
    </nav>
  );
}

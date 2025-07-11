"use client";

import Canvas from "@/components/editor/canvas";
import { getWebsiteById } from "@/lib/service/website.service";
import useWebsiteStore from "@/store/use-website-store";
import { AxiosError } from "axios";
import { use, useEffect } from "react";
import { toast } from "sonner";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { setCurrentWebsite, setPreviewMode } = useWebsiteStore();

  useEffect(() => {
    const getWebsiteData = async () => {
      try {
        const res = await getWebsiteById(id);
        setCurrentWebsite(res.data);
      } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Something went wrong!");
        }
      }
    };
    setPreviewMode(true);
    getWebsiteData();
  }, []);

  return (
    <div className="flex-1 overflow-auto">
      <Canvas />
    </div>
  );
}

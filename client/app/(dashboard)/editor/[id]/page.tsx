"use client";

import Canvas from "@/components/editor/canvas";
import EditorLayout from "@/components/editor/editor-layout";
import Header from "@/components/editor/header";
import { getWebsiteById } from "@/lib/service/website.service";
import useWebsiteStore from "@/store/use-website-store";
import { AxiosError } from "axios";
import { use, useEffect } from "react";
import { toast } from "sonner";

export default function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { isPreviewMode, setCurrentWebsite, setPreviewMode } =
    useWebsiteStore();

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
    setPreviewMode(false);
    getWebsiteData();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      {isPreviewMode ? (
        <div className="flex-1 overflow-auto">
          <Canvas />
        </div>
      ) : (
        <EditorLayout />
      )}
    </main>
  );
}

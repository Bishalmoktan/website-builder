"use client";

import Canvas from "@/components/editor/canvas";
import EditorLayout from "@/components/editor/editor-layout";
import Header from "@/components/editor/header";
import useWebsiteStore from "@/store/use-website-store";
import { useEffect, useState } from "react";

export default function EditorPage() {
  const [hasTriedLoad, setHasTriedLoad] = useState(false);
  const { currentWebsite, createNewWebsite, isPreviewMode, loadWebsite } =
    useWebsiteStore();

  useEffect(() => {
    loadWebsite("test");
    setHasTriedLoad(true);
  }, []);

  // Create a new website when user logs in for the first time
  useEffect(() => {
    if (hasTriedLoad && !currentWebsite) {
      createNewWebsite();
    }
  }, [hasTriedLoad, currentWebsite, createNewWebsite]);
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

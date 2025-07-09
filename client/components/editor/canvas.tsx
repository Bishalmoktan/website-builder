import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useWebsiteStore from "@/store/use-website-store";
import SortableBlock from "./sortable-block";
import { Plus } from "lucide-react";

export default function Canvas() {
  const { currentWebsite, isPreviewMode } = useWebsiteStore();
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas-droppable",
  });

  console.log(currentWebsite);

  const blocks = currentWebsite?.blocks || [];

  console.log(blocks);
  return (
    <div className="flex-1 bg-white overflow-auto">
      <div className="h-full relative">
        {!isPreviewMode && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-3 py-2">
              <span className="text-sm font-medium text-gray-700">
                {currentWebsite?.title || "Untitled Website"}
              </span>
            </div>
          </div>
        )}

        <div
          ref={setNodeRef}
          className={`min-h-full transition-all duration-200 ${
            isOver ? "bg-sky-50 border-2 border-dashed border-sky-300" : ""
          }`}
        >
          {blocks.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Start Building Your Website
                </h3>
                <p className="text-gray-600 max-w-md">
                  Drag blocks from the sidebar to create your travel website.
                  Start with a hero section to make a great first impression.
                </p>
              </div>
            </div>
          ) : (
            <SortableContext
              items={blocks.map((block) => block.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-0">
                {blocks.map((block) => (
                  <SortableBlock key={block.id} block={block} />
                ))}
              </div>
            </SortableContext>
          )}
          {!isPreviewMode && blocks.length > 0 && (
            <div className="flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-600 max-w-md">
                  Drag blocks from the sidebar to add new sections.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

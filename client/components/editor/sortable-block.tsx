import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Block } from "@/types";
import useWebsiteStore from "@/store/use-website-store";
import BlockRenderer from "@/components/blocks/block-renderer";
import { GripVertical, Edit3, Trash2 } from "lucide-react";

interface SortableBlockProps {
  block: Block;
}

export default function SortableBlock({ block }: SortableBlockProps) {
  const { selectedBlock, setSelectedBlock, deleteBlock, isPreviewMode } =
    useWebsiteStore();
  const isSelected = selectedBlock?.id === block.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.9 : 1,
  };

  if (isPreviewMode) {
    return <BlockRenderer block={block} />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isSelected ? "ring-2 ring-sky-500" : ""}`}
      onClick={() => setSelectedBlock(block)}
    >
      {/* Block Controls */}
      <div className="absolute top-2 right-2 z-[99999] opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center space-x-1 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          <button
            {...attributes}
            {...listeners}
            className="p-1 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <GripVertical size={14} className="text-gray-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBlock(block);
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Edit block"
          >
            <Edit3 size={14} className="text-gray-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteBlock(block.id);
            }}
            className="p-1 hover:bg-red-100 rounded"
            title="Delete block"
          >
            <Trash2 size={14} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Block Content */}
      <div
        className={`${
          isSelected ? "border-2 border-sky-500" : "border-2 border-transparent"
        } transition-all duration-200`}
      >
        <BlockRenderer block={block} />
      </div>
    </div>
  );
}

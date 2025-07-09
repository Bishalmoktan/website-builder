import { blockTypes } from "@/data/block-types";
import { useDraggable } from "@dnd-kit/core";
import { Plus } from "lucide-react";

interface DraggableBlockProps {
  blockType: (typeof blockTypes)[0];
}

function DraggableBlock({ blockType }: DraggableBlockProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `draggable-${blockType.id}`,
      data: { blockType: blockType.id },
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const IconComponent = blockType.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition-all duration-200 cursor-grab active:cursor-grabbing group"
    >
      <div className="flex items-center justify-center w-8 h-8 bg-sky-100 rounded-md mr-3 group-hover:bg-sky-200 transition-colors">
        <IconComponent size={16} className="text-sky-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {blockType.name}
        </p>
      </div>
      <Plus
        size={14}
        className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
}

export default function BlockSidebar() {
  const categories = [...new Set(blockTypes.map((block) => block.category))];

  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Blocks</h2>
        <p className="text-sm text-gray-600">
          Drag blocks to build your travel website
        </p>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              {category}
            </h3>
            <div className="space-y-2">
              {blockTypes
                .filter((block) => block.category === category)
                .map((blockType) => (
                  <DraggableBlock key={blockType.id} blockType={blockType} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

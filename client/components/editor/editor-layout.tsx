import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import useWebsiteStore from "@/store/use-website-store";
import { blockTypes } from "@/data/block-types";
import { Block } from "@/types";
import BlockSidebar from "./block-sidebar";
import Canvas from "./canvas";
import PropertiesPanel from "./properties-panel";

export default function EditorLayout() {
  const { addBlock, moveBlock, setSelectedBlock } = useWebsiteStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Handle dropping a new block from sidebar
    if (
      active.id.toString().startsWith("draggable-") &&
      over.id === "canvas-droppable"
    ) {
      const blockTypeId = active.data.current?.blockType;
      const blockType = blockTypes.find((bt) => bt._id === blockTypeId);

      if (blockType) {
        const newBlock: Block = {
          _id: crypto.randomUUID(),
          type: blockType._id,
          content: blockType.defaultContent,
          style: blockType.defaultStyle,
        };

        addBlock(newBlock);
        setSelectedBlock(newBlock);
      }
      return;
    }

    // Handle reordering existing blocks
    if (active.id !== over.id) {
      const { currentWebsite } = useWebsiteStore.getState();
      if (!currentWebsite) return;

      const oldIndex = currentWebsite.blocks.findIndex(
        (block) => block._id === active.id
      );
      const newIndex = currentWebsite.blocks.findIndex(
        (block) => block._id === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        moveBlock(oldIndex, newIndex);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-gray-100">
        <BlockSidebar />
        <Canvas />
        <PropertiesPanel />
      </div>
    </DndContext>
  );
}

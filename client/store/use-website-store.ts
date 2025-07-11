import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { Block, Website, User, Theme } from "../types";

interface WebsiteStore {
  allWebsites: Website[];
  userWebsites: Website[];

  currentWebsite: Website | null;
  selectedBlock: Block | null;
  isPreviewMode: boolean;

  // Actions
  setAllWebsites: (websites: Website[]) => void;
  setUserWebsites: (websites: Website[]) => void;

  setCurrentWebsite: (website: Website | null) => void;
  setSelectedBlock: (block: Block | null) => void;
  setPreviewMode: (value: boolean) => void;

  // Block actions
  addBlock: (block: Block) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;

  // Website actions
  updateWebsiteTitle: (title: string) => void;
  updateWebsiteTheme: (theme: Theme) => void;
}

const useWebsiteStore = create<WebsiteStore>()(
  immer((set, get) => ({
    allWebsites: [],
    userWebsites: [],
    currentWebsite: null,
    selectedBlock: null,
    user: null,
    isPreviewMode: false,

    setAllWebsites: (websites) => set({ allWebsites: websites }),
    setUserWebsites: (websites) => set({ userWebsites: websites }),
    setCurrentWebsite: (website) =>
      set((state) => {
        state.currentWebsite = website;
      }),
    setSelectedBlock: (block) =>
      set((state) => {
        state.selectedBlock = block;
      }),
    setPreviewMode: (value) =>
      set((state) => {
        state.isPreviewMode = value;
      }),

    addBlock: (block) =>
      set((state) => {
        if (!state.currentWebsite) return;
        state.currentWebsite.blocks.push(block);
        state.currentWebsite.updatedAt = new Date().toISOString();
      }),

    updateBlock: (id, updates) =>
      set((state) => {
        if (!state.currentWebsite) return;
        const block = state.currentWebsite.blocks.find((b) => b._id === id);
        if (!block) return;
        if (updates.content) Object.assign(block.content, updates.content);
        if (updates.style) Object.assign(block.style, updates.style);
        state.currentWebsite.updatedAt = new Date().toISOString();

        if (state.selectedBlock?._id === id) {
          state.selectedBlock = block;
        }
      }),

    deleteBlock: (id) =>
      set((state) => {
        if (!state.currentWebsite) return;
        state.currentWebsite.blocks = state.currentWebsite.blocks.filter(
          (b) => b._id !== id
        );
        state.currentWebsite.updatedAt = new Date().toISOString();
        if (state.selectedBlock?._id === id) {
          state.selectedBlock = null;
        }
      }),

    moveBlock: (fromIndex, toIndex) =>
      set((state) => {
        if (!state.currentWebsite) return;
        const blocks = state.currentWebsite.blocks;
        const [moved] = blocks.splice(fromIndex, 1);
        blocks.splice(toIndex, 0, moved);
        state.currentWebsite.updatedAt = new Date().toISOString();
      }),

    updateWebsiteTitle: (title) =>
      set((state) => {
        if (!state.currentWebsite) return;
        state.currentWebsite.title = title;
        state.currentWebsite.updatedAt = new Date().toISOString();
      }),

    updateWebsiteTheme: (theme) =>
      set((state) => {
        if (!state.currentWebsite) return;
        state.currentWebsite.theme = theme;
        state.currentWebsite.updatedAt = new Date().toISOString();
      }),
  }))
);

export default useWebsiteStore;

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { Block, Website, User, Theme } from "../types";

interface WebsiteStore {
  currentWebsite: Website | null;
  selectedBlock: Block | null;
  user: User | null;
  isPreviewMode: boolean;

  // Actions
  setCurrentWebsite: (website: Website | null) => void;
  setSelectedBlock: (block: Block | null) => void;
  setUser: (user: User | null) => void;
  togglePreviewMode: () => void;

  // Block actions
  addBlock: (block: Block) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;

  // Website actions
  updateWebsiteTitle: (title: string) => void;
  updateWebsiteTheme: (theme: Theme) => void;
  saveWebsite: () => void;
  loadWebsite: (id: string) => void;
  createNewWebsite: () => void;
}

const defaultTheme: Theme = {
  primaryColor: "#0EA5E9",
  secondaryColor: "#F97316",
  fontFamily: "Inter",
  backgroundColor: "#ffffff",
};

const useWebsiteStore = create<WebsiteStore>()(
  immer((set, get) => ({
    currentWebsite: null,
    selectedBlock: null,
    user: null,
    isPreviewMode: false,

    setCurrentWebsite: (website) =>
      set((state) => {
        state.currentWebsite = website;
      }),
    setSelectedBlock: (block) =>
      set((state) => {
        state.selectedBlock = block;
      }),
    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),
    togglePreviewMode: () =>
      set((state) => {
        state.isPreviewMode = !state.isPreviewMode;
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
        const block = state.currentWebsite.blocks.find((b) => b.id === id);
        if (!block) return;
        if (updates.content) Object.assign(block.content, updates.content);
        if (updates.style) Object.assign(block.style, updates.style);
        state.currentWebsite.updatedAt = new Date().toISOString();

        if (state.selectedBlock?.id === id) {
          state.selectedBlock = block;
        }
      }),

    deleteBlock: (id) =>
      set((state) => {
        if (!state.currentWebsite) return;
        state.currentWebsite.blocks = state.currentWebsite.blocks.filter(
          (b) => b.id !== id
        );
        state.currentWebsite.updatedAt = new Date().toISOString();
        if (state.selectedBlock?.id === id) {
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

    saveWebsite: () => {
      // save to database
      const state = get();
      if (state.currentWebsite) {
        localStorage.setItem(
          "currentWebsite",
          JSON.stringify(state.currentWebsite)
        );
      }
    },

    loadWebsite: (id) => {
      // load from backend
      const saved = localStorage.getItem("currentWebsite");
      if (saved) {
        const website = JSON.parse(saved);
        console.log("load", website);
        set((state) => {
          state.currentWebsite = website;
          state.selectedBlock = null;
        });
      }
    },

    createNewWebsite: () => {
      const newWebsite: Website = {
        id: crypto.randomUUID(),
        title: "My Travel Website",
        blocks: [],
        theme: defaultTheme,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => {
        state.currentWebsite = newWebsite;
        state.selectedBlock = null;
      });
    },
  }))
);

export default useWebsiteStore;

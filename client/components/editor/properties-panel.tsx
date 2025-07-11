"use client";
import { useState } from "react";
import {
  X,
  Settings,
  Type,
  Palette,
  Layout,
  Loader2,
  Sparkles,
  Check,
} from "lucide-react";

import useWebsiteStore from "@/store/use-website-store";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { subtitlePrompt, titlePrompt } from "@/data/prompt";

interface GeneratedContent {
  field: string;
  content: string;
  isVisible: boolean;
}

export default function PropertiesPanel() {
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { selectedBlock, setSelectedBlock, updateBlock } = useWebsiteStore();

  if (!selectedBlock) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Block Selected
          </h3>
          <p className="text-gray-600">
            Select a block from the canvas to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const acceptGenerated = () => {
    if (generatedContent) {
      handleContentChange(generatedContent.field, generatedContent.content);
      setGeneratedContent(null);
    }
  };

  const rejectGenerated = () => {
    setGeneratedContent(null);
  };

  const handleContentChange = (field: string, value: any) => {
    updateBlock(selectedBlock._id, {
      content: {
        ...selectedBlock.content,
        [field]: value,
      },
    });
  };

  const handleStyleChange = (field: string, value: any) => {
    updateBlock(selectedBlock._id, {
      style: {
        ...selectedBlock.style,
        [field]: value,
      },
    });
  };

  const generateContent = async (field: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: field === "title" ? titlePrompt : subtitlePrompt,
        }),
      });

      const data = await response.json();

      setGeneratedContent({
        field,
        content: data.content,
        isVisible: true,
      });
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderFieldEditor = (
    field: string,
    value: any,
    type: "content" | "style"
  ) => {
    const onChange =
      type === "content" ? handleContentChange : handleStyleChange;

    if (typeof value === "string") {
      if (field.includes("Color") || field.includes("color")) {
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(field, e.target.value)}
              className="w-8 h-8 rounded border border-gray-300"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(field, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="Enter color code"
            />
          </div>
        );
      }

      if (
        field.includes("Image") ||
        field.includes("image") ||
        field.includes("url")
      ) {
        return (
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Enter image URL"
          />
        );
      }

      if (field === "title" || field === "Title") {
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Enter title"
          />
        );
      }

      if (
        field.includes("description") ||
        field.includes("text") ||
        field.includes("subtitle")
      ) {
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Enter text"
          />
        );
      }

      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          placeholder={`Enter ${field}`}
        />
      );
    }

    if (typeof value === "number") {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(field, Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          placeholder={`Enter ${field}`}
        />
      );
    }

    return (
      <div className="text-sm text-gray-500 italic">
        Complex field (not editable in this demo)
      </div>
    );
  };

  const formatFieldName = (field: string) => {
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Properties</h2>
        <button
          onClick={() => setSelectedBlock(null)}
          className="p-1 hover:bg-gray-200 rounded-md"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Block Type Info */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Layout size={16} className="text-sky-600" />
            <span className="text-sm font-medium text-gray-700">
              Block Type
            </span>
          </div>
          <p className="text-sm text-gray-600 capitalize">
            {selectedBlock.type}
          </p>
        </div>

        {/* Content Fields */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Type size={16} className="text-sky-600" />
            <span className="text-sm font-medium text-gray-700">Content</span>
          </div>
          <div className="space-y-4">
            {Object.entries(selectedBlock.content).map(([field, value]) => (
              <div key={field}>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700 ">
                    {formatFieldName(field)}
                  </label>

                  {field.includes("title") && selectedBlock.type === "hero" && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => generateContent(field)}
                      disabled={isGenerating}
                      className="flex items-center gap-1 text-xs"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3" />
                      )}
                      Generate with AI
                    </Button>
                  )}
                </div>

                {generatedContent &&
                  generatedContent.field === field &&
                  generatedContent.isVisible && (
                    <Card className="border-sky-200 bg-sky-50 my-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-sky-600" />
                          AI Generated {field}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-700 mb-3 p-2 bg-white rounded border">
                          {generatedContent.content}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={acceptGenerated}
                            className="flex items-center gap-1"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={rejectGenerated}
                            className="flex items-center gap-1 bg-transparent"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => generateContent(field)}
                            disabled={isGenerating}
                            className="flex items-center gap-1"
                          >
                            <Sparkles className="h-3 w-3" />
                            Regenerate
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                {renderFieldEditor(field, value, "content")}
              </div>
            ))}
          </div>
        </div>

        {/* Style Fields */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <Palette size={16} className="text-sky-600" />
            <span className="text-sm font-medium text-gray-700">Style</span>
          </div>
          <div className="space-y-4">
            {Object.entries(selectedBlock.style).map(([field, value]) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formatFieldName(field)}
                </label>
                {renderFieldEditor(field, value, "style")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

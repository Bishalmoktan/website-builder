import useWebsiteStore from "@/store/use-website-store";
import {
  Play,
  Square,
  Save,
  Eye,
  Settings,
  Download,
  Home,
} from "lucide-react";
import Logo from "../logo";

export default function Header() {
  const {
    currentWebsite,
    isPreviewMode,
    togglePreviewMode,
    saveWebsite,
    updateWebsiteTitle,
    createNewWebsite,
  } = useWebsiteStore();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateWebsiteTitle(e.target.value);
  };

  const handleSave = () => {
    saveWebsite();
    // Show success message (you could add a toast notification here)
  };

  const handleExport = () => {
    // Implementation for exporting the website
    const exportData = {
      website: currentWebsite,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentWebsite?.title || "website"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo />

          <div className="h-6 w-px bg-gray-300" />

          <input
            type="text"
            value={currentWebsite?.title || ""}
            onChange={handleTitleChange}
            placeholder="Website Title"
            className="text-lg font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 max-w-xs"
          />
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >
            <Save size={16} />
            <span>Save</span>
          </button>

          <button
            onClick={togglePreviewMode}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isPreviewMode
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isPreviewMode ? (
              <>
                <Square size={16} />
                <span>Edit</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>Preview</span>
              </>
            )}
          </button>

          <div className="h-6 w-px bg-gray-300" />

          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Download size={16} />
            <span>Export</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={16} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
}

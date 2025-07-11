import useWebsiteStore from "@/store/use-website-store";
import {
  Play,
  Save,
  Settings,
  Download,
  Edit,
  ExternalLink,
} from "lucide-react";
import Logo from "../logo";
import { updateWesbite } from "@/lib/service/website.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";

export default function Header() {
  const {
    currentWebsite,
    isPreviewMode,
    setPreviewMode,
    updateWebsiteTitle,
    setCurrentWebsite,
  } = useWebsiteStore();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateWebsiteTitle(e.target.value);
  };

  const handleSave = async () => {
    if (!currentWebsite) {
      toast.error("No website data found!");
      return;
    }
    try {
      await updateWesbite(currentWebsite);
      toast.success("Website updated successfully");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleExport = () => {
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

  const handleUpdate = async () => {
    const value = currentWebsite?.isPublished;
    if (!currentWebsite) {
      toast.error("No website data found!");
      return;
    }
    try {
      const res = await updateWesbite({
        _id: currentWebsite._id,
        isPublished: !value,
      });

      setCurrentWebsite(res.data);

      if (value) {
        toast.success(`Website unpublished successfully`);
      } else {
        toast.success(`Website published successfully`, {
          description: (
            <div>
              Your website link:{" "}
              <Link
                className="text-blue-500 hover:underline"
                target="_blank"
                href={`/website/${currentWebsite._id}`}
              >
                {currentWebsite.title}
              </Link>{" "}
            </div>
          ),
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
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
            onClick={() => {
              if (isPreviewMode) {
                setPreviewMode(false);
              } else {
                setPreviewMode(true);
              }
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isPreviewMode
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isPreviewMode ? (
              <>
                <Edit size={16} />
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

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleUpdate}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ExternalLink size={16} />
                <span>
                  {currentWebsite?.isPublished ? "Unpublish" : "Publish"}
                </span>
              </button>
            </TooltipTrigger>

            <TooltipContent>
              {currentWebsite?.isPublished ? (
                <p>Your website will be hidden from public</p>
              ) : (
                <p>Your website will be publicly visible</p>
              )}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
}

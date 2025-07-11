import { Website } from "@/types";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Calendar, Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { useUserStore } from "@/store/use-user-store";
import Link from "next/link";
import Image from "next/image";
import { deleteWebsite } from "@/lib/service/website.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import useWebsiteStore from "@/store/use-website-store";
import { useRouter } from "next/navigation";

interface WebsiteCardProps {
  website: Website;
}

const travelImages = [
  "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
  "https://images.pexels.com/photos/21014/pexels-photo.jpg",
  "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
  "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg",
  "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg",
];

const randomImage = () =>
  travelImages[Math.floor(Math.random() * travelImages.length)];

export default function WebsiteCard({ website }: WebsiteCardProps) {
  const { user } = useUserStore();
  const { userWebsites, setUserWebsites } = useWebsiteStore();

  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteWebsite(website._id);
      const newUserWebsites = userWebsites.filter((w) => w._id !== website._id);
      setUserWebsites(newUserWebsites);
      router.refresh();
      toast.success(`"${website.title}" deleted successfully`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <Card
      key={website._id}
      className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-gray-200 overflow-hidden"
    >
      <div className="relative">
        <Image
          src={randomImage() || "/placeholder.svg"}
          width={500}
          height={500}
          alt={website.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant={website.isPublished ? "default" : "secondary"}
            className={
              website.isPublished
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                : "bg-gray-500 text-white"
            }
          >
            {website.isPublished ? "Published" : "Draft"}
          </Badge>
        </div>
      </div>

      <CardHeader className="-mb-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {website.title}
            </CardTitle>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {website.user === user?._id && (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/editor/${website._id}`}
                      className="flex items-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={`/website/${website._id}`}
                      target="_blank"
                      className="flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
              {website.user !== user?._id && (
                <DropdownMenuItem>
                  <Link
                    href={`/website/${website._id}`}
                    target="_blank"
                    className="flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardFooter className="">
        <div className="flex items-center justify-between w-full text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(website.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

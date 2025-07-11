"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Plus, Search, Globe } from "lucide-react";
import Link from "next/link";
import Navbar from "./navbar";
import StatsCard from "./stats-card";
import useWebsiteStore from "@/store/use-website-store";
import { getAllWebsites, getUserWebsites } from "@/lib/service/website.service";
import { useUserStore } from "@/store/use-user-store";
import { Website } from "@/types";
import WebsiteCard from "./website-card";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [websites, setWebsites] = useState<Website[]>([]);

  const [filter, setFilter] = useState("all"); // all, my-websites, published, draft

  const { setUserWebsites, setAllWebsites, allWebsites, userWebsites } =
    useWebsiteStore();
  const { user } = useUserStore();

  useEffect(() => {
    getAllWebsites().then((data) => setAllWebsites(data.data));
    getUserWebsites().then((data) => setUserWebsites(data.data));
  }, []);

  useEffect(() => {
    if (!userWebsites || !allWebsites) return;

    let filtered: Website[] = [];

    if (filter === "my-websites") {
      filtered = userWebsites;
    } else if (filter === "published") {
      filtered = userWebsites.filter((website) => website.isPublished);
    } else if (filter === "draft") {
      filtered = userWebsites.filter((website) => !website.isPublished);
    } else {
      const merged = [...allWebsites, ...userWebsites];
      const uniqueWebsitesMap = new Map<string, Website>();
      merged.forEach((website) => uniqueWebsitesMap.set(website._id, website));
      filtered = Array.from(uniqueWebsitesMap.values());
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((website) =>
        website.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setWebsites(filtered);
  }, [filter, allWebsites, userWebsites, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <StatsCard />

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search websites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 py-6 backdrop-blur-sm border-gray-200"
            />
          </div>

          <div className="flex gap-2 items-center">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : ""
              }
            >
              All
            </Button>
            <Button
              variant={filter === "my-websites" ? "default" : "outline"}
              onClick={() => setFilter("my-websites")}
              className={
                filter === "my-websites"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : ""
              }
            >
              My Websites
            </Button>
            <Button
              variant={filter === "published" ? "default" : "outline"}
              onClick={() => setFilter("published")}
              className={
                filter === "published"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : ""
              }
            >
              Published
            </Button>
            <Button
              variant={filter === "draft" ? "default" : "outline"}
              onClick={() => setFilter("draft")}
              className={
                filter === "draft"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : ""
              }
            >
              Drafts
            </Button>
          </div>
        </div>

        {/* Websites Grid */}
        {websites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => (
              <WebsiteCard key={website._id} website={website} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
              <Globe className="w-12 h-12 text-indigo-500" />
            </div>

            {searchQuery ? (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No websites found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any websites matching "{searchQuery}". Try
                  adjusting your search or filters.
                </p>
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                  className="mr-3"
                >
                  Clear Search
                </Button>
              </>
            ) : userWebsites.length === 0 ? (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Create your first website
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Get started by creating your first website with our intuitive
                  drag-and-drop editor. Build beautiful, professional websites
                  in minutes.
                </p>
                <Link href="/editor">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Website
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No websites match your filters
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Try adjusting your filters to see more websites.
                </p>
                <Button onClick={() => setFilter("all")} variant="outline">
                  Show All Websites
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

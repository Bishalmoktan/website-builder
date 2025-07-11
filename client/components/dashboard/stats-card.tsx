"use client";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, Globe, Users } from "lucide-react";
import useWebsiteStore from "@/store/use-website-store";

export default function StatsCard() {
  const { userWebsites } = useWebsiteStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">
                Your Total Websites
              </p>
              <p className="text-3xl font-bold">{userWebsites.length}</p>
            </div>
            <Globe className="w-8 h-8 text-indigo-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">
                Published by you
              </p>
              <p className="text-3xl font-bold">
                {userWebsites.filter((w) => w.isPublished).length}
              </p>
            </div>
            <Eye className="w-8 h-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

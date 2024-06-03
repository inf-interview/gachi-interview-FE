"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaPen } from "react-icons/fa";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import InterviewReview from "./InterviewReview";
import GetStudy from "./GetStudy";
import { useState } from "react";

export default function CommunityContainer() {
  const tabParams = useSearchParams().get("tab") || undefined;
  const router = useRouter();

  const page = 1;
  const [sortType, setSortType] = useState<"new" | "like">("new");

  const handleTabClick = (value: string) => {
    router.replace(`/community?tab=${value}`);
  };

  const handleSortType = (value: string) => {
    setSortType(value as "new" | "like");
  };

  return (
    <Tabs defaultValue={tabParams}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <TabsList className="mr-4">
            <TabsTrigger value="reviews" onClick={() => handleTabClick("reviews")}>
              면접 후기
            </TabsTrigger>
            <TabsTrigger value="studies" onClick={() => handleTabClick("studies")}>
              스터디 모집
            </TabsTrigger>
          </TabsList>
          <Select onValueChange={handleSortType}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="최신순" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">최신순</SelectItem>
              <SelectItem value="like">인기순</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Link href={`/community/create?tab=${tabParams}`}>
          <Button className="rounded-3xl">
            <FaPen className="mr-2" />
            글쓰기
          </Button>
        </Link>
      </div>
      <TabsContent value="reviews">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InterviewReview tabParams={tabParams} sortType={sortType} page={page} />
        </div>
      </TabsContent>
      <TabsContent value="studies">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GetStudy tabParams={tabParams} sortType={sortType} page={page} />
        </div>
      </TabsContent>
    </Tabs>
  );
}

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BsPlusCircle } from "react-icons/bs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import InterviewReview from "./InterviewReview";
import GetStudy from "./GetStudy";
import { useState } from "react";

export default function CommunityContainer() {
  const tabParams = useSearchParams().get("tab") || undefined;

  const page = 1;
  const [sortType, setSortType] = useState<"recent" | "like">("recent");

  const handleSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as "recent" | "like");
  };

  return (
    <Tabs defaultValue={tabParams}>
      <div className="flex">
        <div className="flex-1">
          <TabsList>
            <Link href="/community?tab=reviews">
              <TabsTrigger value="reviews">면접 후기</TabsTrigger>
            </Link>
            <Link href="/community?tab=studies">
              <TabsTrigger value="studies">스터디 모집</TabsTrigger>
            </Link>
          </TabsList>
          <select
            className="h-10 w-32 rounded-md border border-input bg-background ml-3 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue="최신순"
            onChange={handleSortType}
          >
            <option value="recent">최신순</option>
            <option value="like">인기순</option>
          </select>
        </div>
        <Link href={`/community/create?tab=${tabParams}`}>
          <Button>
            <BsPlusCircle className="mr-2" />
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

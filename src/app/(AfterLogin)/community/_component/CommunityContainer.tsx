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
import { useEffect, useState } from "react";
import FilterTag from "../../_component/FilterTag";
import { useQuery } from "@tanstack/react-query";
import { Post, PostContent } from "@/model/Post";
import getBoards from "../_lib/getBoards";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/store/auth";
import Loading from "../../_component/Loading";
import { Video } from "@/model/Video";

export default function CommunityContainer() {
  const tabParams = useSearchParams().get("tab") || undefined;
  const category = tabParams as string;
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenState);
  const page = 1;
  const [sortType, setSortType] = useState<"new" | "like">("new");

  const {
    data: boardList,
    error,
    isLoading,
  } = useQuery<PostContent, Object, PostContent, [_1: string, _2: string, _3: string, _4: number]>({
    queryKey: ["community", category, sortType, page],
    queryFn: ({ queryKey }) => getBoards({ queryKey, sortType, page, accessToken }),
  });

  const [filteredBoardList, setFilteredBoardList] = useState<Post[]>(boardList?.content || []);

  useEffect(() => {
    if (boardList?.content) {
      setFilteredBoardList(boardList.content);
    }
  }, [boardList]);

  const handleTabClick = (value: string) => {
    router.replace(`/community?tab=${value}`);
  };

  const handleSortType = (value: string) => {
    setSortType(value as "new" | "like");
  };

  const handleFilterChange = (filteredList: (Video | Post)[]) => {
    setFilteredBoardList(filteredList as Post[]);
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <Tabs defaultValue={tabParams}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center w-full">
          <TabsList className="mr-4">
            <TabsTrigger value="reviews" onClick={() => handleTabClick("reviews")}>
              면접 후기
            </TabsTrigger>
            <TabsTrigger value="studies" onClick={() => handleTabClick("studies")}>
              스터디 모집
            </TabsTrigger>
          </TabsList>
          <FilterTag originalList={boardList?.content} onFilterChange={handleFilterChange} />
          <div className="flex-grow w-40 mx-4">
            <Select onValueChange={handleSortType}>
              <SelectTrigger>
                <SelectValue placeholder="최신순" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">최신순</SelectItem>
                <SelectItem value="like">인기순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Link href={`/community/create?tab=${tabParams}`}>
          <Button className="rounded-3xl">
            <FaPen className="mr-2" />
            글쓰기
          </Button>
        </Link>
      </div>
      <TabsContent value="reviews">
        <div>
          <InterviewReview
            tabParams={tabParams}
            boardList={boardList}
            filteredBoardList={filteredBoardList}
          />
        </div>
      </TabsContent>
      <TabsContent value="studies">
        <div>
          <GetStudy
            tabParams={tabParams}
            boardList={boardList}
            filteredBoardList={filteredBoardList}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}

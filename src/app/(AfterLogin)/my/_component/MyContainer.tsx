"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import MyInterviewReviewPosts from "./MyInterviewReviewPosts";
import MyGetStudyPosts from "./MyGetStudyPosts";
import MyVideoPosts from "./MyVideoPosts";
import { MdLogout } from "react-icons/md";
import MyComments from "./MyComments";

export default function MyContainer() {
  const tabParams = useSearchParams().get("tab") || undefined;
  const router = useRouter();

  const handleTabClick = (value: string) => {
    router.replace(`/my?tab=${value}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <section>
      <Tabs defaultValue={tabParams}>
        <div className="flex">
          <div className="flex-1">
            <TabsList className="mx-auto my-0 inline-block">
              <TabsTrigger value="videos" onClick={() => handleTabClick("videos")}>
                MY 인터뷰 영상
              </TabsTrigger>
              <TabsTrigger value="reviews" onClick={() => handleTabClick("reviews")}>
                MY 면접후기
              </TabsTrigger>
              <TabsTrigger value="studies" onClick={() => handleTabClick("studies")}>
                MY 스터디모집
              </TabsTrigger>
              <TabsTrigger value="comments" onClick={() => handleTabClick("comments")}>
                MY 댓글
              </TabsTrigger>
            </TabsList>
          </div>
          <Button onClick={handleLogout} className="rounded-3xl" variant="outline">
            <MdLogout className="mr-2" />
            로그아웃
          </Button>
        </div>
        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MyVideoPosts />
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MyInterviewReviewPosts tabParams={tabParams} />
          </div>
        </TabsContent>
        <TabsContent value="studies">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MyGetStudyPosts tabParams={tabParams} />
          </div>
        </TabsContent>
        <TabsContent value="comments">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MyComments />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

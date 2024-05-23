"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CommentCard from "./CommentCard";
import MyInterviewReviewPosts from "./MyInterviewReviewPosts";
import MyGetStudyPosts from "./MyGetStudyPosts";
import MyVideoPosts from "./MyVideoPosts";

const InterViewData = [
  {
    videoId: 1,
    videoTitle: "인터뷰 영상 제목",
    time: "2024.04.09",
    numOfLike: 10,
    tags: ["프론트엔드", "백엔드", "풀스택", "자바스크립트", "타입스크립트", "리액트", "노드"],
    thumbnailUrl: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
  },
  {
    videoId: 2,
    videoTitle: "인터뷰 영상 제목",
    time: "2024.04.09",
    numOfLike: 10,
    tags: ["tag1", "tag2", "tag3"],
    thumbnailUrl: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
  },
  {
    videoId: 3,
    videoTitle: "인터뷰 영상 제목",
    time: "2024.04.09",
    numOfLike: 10,
    tags: ["tag1", "tag2", "tag3"],
    thumbnailUrl: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
  },
  {
    videoId: 3,
    videoTitle: "인터뷰 영상 제목",
    time: "2024.04.09",
    numOfLike: 10,
    tags: ["tag1", "tag2", "tag3"],
    thumbnailUrl: "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
  },
];

const PostData = [
  {
    postId: 1,
    title: "게시글 제목",
    commentCount: 10,
    content:
      "1차 서류 - 2차 과제테스트 - 3차 기술면접 - 4차 인성면접 - 합격 과제는 두가지 유형 중 선택해서 풀이 후 제출하면 되는데 제출 후 연락까지 2주가 걸렸다. 기술면접은 편한 분위기라....",
    time: "2024.04.09",
    tags: ["프론트엔드", "백엔드", "풀스택", "자바스크립트", "타입스크립트", "리액트", "노드"],
    likeCount: 10,
  },
  {
    postId: 2,
    title: "면접 후기",
    commentCount: 10,
    content:
      "1차 서류 - 2차 과제테스트 - 3차 기술면접 - 4차 인성면접 - 합격 과제는 두가지 유형 중 선택해서 풀이 후 제출하면 되는데 제출 후 연락까지 2주가 걸렸다. 기술면접은 편한 분위기라 lorem ipsum dolor sit amet, consectetur adipiscing elit.  lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "2024.04.09",
    tags: ["카카오", "네이버", "넷플릭스", "구글", "애플", "아마존", "페이스북"],
    likeCount: 10,
  },
  {
    postId: 3,
    title: "게시글 제목",
    commentCount: 10,
    content: "게시글 내용",
    time: "2024.04.09",
    tags: ["tag1", "tag2", "tag3"],
    likeCount: 10,
  },
];

const CommentData = [
  {
    content: "댓글 내용",
    createdAt: "2024.04.09",
  },
  {
    content: "댓글 내용",
    createdAt: "2024.04.09",
  },
  {
    content: "댓글 내용",
    createdAt: "2024.04.09",
  },
];

export default function MyContainer() {
  const tabParams = useSearchParams().get("tab") || undefined;
  return (
    <section>
      <Tabs defaultValue={tabParams}>
        <div className="flex">
          <div className="flex-1">
            <TabsList className="mx-auto my-0 inline-block">
              <Link href="/my?tab=videos">
                <TabsTrigger value="videos">MY 인터뷰 영상</TabsTrigger>
              </Link>
              <Link href="/my?tab=reviews">
                <TabsTrigger value="reviews">MY 면접후기</TabsTrigger>
              </Link>
              <Link href="/my?tab=studies">
                <TabsTrigger value="studies">MY 스터디모집</TabsTrigger>
              </Link>
              <Link href="/my?tab=comments">
                <TabsTrigger value="comments">MY 댓글</TabsTrigger>
              </Link>
            </TabsList>
          </div>
          <Button>로그아웃</Button>
        </div>
        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MyVideoPosts tabParams={tabParams} />
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
            {CommentData.map((data, index) => (
              <CommentCard key={index} {...data} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

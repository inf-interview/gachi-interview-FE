"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

import InterviewCard from "./_component/InterviewCard";
import PostCard from "./_component/PostCard";
import CommentCard from "./_component/CommentCard";

const InterViewData = [
  {
    videoId: 1,
    videoTitle: "인터뷰 영상 제목",
    time: "2024.04.09",
    numOfLike: 10,
    tags: ["tag1", "tag2", "tag3", "tag2", "tag3", "tag2", "tag3"],
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
];

const PostData = [
  {
    postId: 1,
    title: "게시글 제목",
    commentCount: 10,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corporis et dolores molestias. Mollitia quos optio modi, cum aliquid pariatur voluptates eum quibusdam provident distinctio est hic aut accusantium obcaecati?",
    time: "2024.04.09",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    postId: 2,
    title: "게시글 제목",
    commentCount: 10,
    content: "게시글 내용",
    time: "2024.04.09",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    postId: 3,
    title: "게시글 제목",
    commentCount: 10,
    content: "게시글 내용",
    time: "2024.04.09",
    tags: ["tag1", "tag2", "tag3"],
  },
];

const CommentData = [
  {
    username: "username",
    content: "댓글 내용",
    createdAt: "2024.04.09",
  },
  {
    username: "username",
    content: "댓글 내용",
    createdAt: "2024.04.09",
  },
  {
    username: "username",
    content: "댓글 내용",
    createdAt: "2024.04.09",
  },
];

const My = () => {
  const [tab, setTab] = useState("video");

  return (
    <section className="p-8">
      <Tabs>
        <TabsList className="mx-auto my-0 inline-block">
          <TabsTrigger value="video" defaultValue={tab}>
            내 인터뷰 영상
          </TabsTrigger>
          <TabsTrigger value="post">내 게시글</TabsTrigger>
          <TabsTrigger value="comments">내 댓글</TabsTrigger>
        </TabsList>
        <TabsContent
          value="video"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4"
        >
          {InterViewData.map((data, index) => (
            <InterviewCard key={index} {...data} />
          ))}
        </TabsContent>
        <TabsContent
          value="post"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4"
        >
          {PostData.map((data, index) => (
            <PostCard key={index} {...data} />
          ))}
        </TabsContent>
        <TabsContent value="comments">
          {CommentData.map((data, index) => (
            <CommentCard key={index} {...data} />
          ))}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default My;

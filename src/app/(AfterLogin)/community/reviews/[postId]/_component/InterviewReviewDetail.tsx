"use client";

import { Post } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import PostDetail from "../../../_component/PostDetail";
import getReviewDetail from "../_lib/getReviewDetail";

export default function InterviewReviewDetail({ postId }: { postId: string }) {
  const { data: post } = useQuery<Post, Object, Post, [_1: string, _2: string, _3: string]>({
    queryKey: ["community", "reviews", postId],
    queryFn: getReviewDetail,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!post) return null;

  return <PostDetail post={post} />;
}

"use client";

import { Post } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import PostDetail from "../../../_component/PostDetail";
import getReviewDetail from "../_lib/getReviewDetail";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/store/auth";

export default function InterviewReviewDetail({ postId }: { postId: string }) {
  const accessToken = useRecoilValue(accessTokenState);
  const { data: post } = useQuery<Post, Object, Post, [_1: string, _2: string, _3: string]>({
    queryKey: ["community", "reviews", postId],
    queryFn: ({ queryKey }) => getReviewDetail({ queryKey, accessToken }),
  });

  if (!post) return null;

  return <PostDetail post={post} />;
}

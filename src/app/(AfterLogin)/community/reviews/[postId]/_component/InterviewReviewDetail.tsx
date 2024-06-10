"use client";

import { Post } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import PostDetail from "../../../_component/PostDetail";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/store/auth";
import getPostDetail from "../../../_lib/getPostDetail";

export default function InterviewReviewDetail({ postId }: { postId: string }) {
  const accessToken = useRecoilValue(accessTokenState);
  const { data: post } = useQuery<Post, Object, Post, [_1: string, _2: string]>({
    queryKey: ["community", postId],
    queryFn: ({ queryKey }) => getPostDetail({ queryKey, accessToken }),
  });

  if (!post) return null;

  return <PostDetail post={post} />;
}

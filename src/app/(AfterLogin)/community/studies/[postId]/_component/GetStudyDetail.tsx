"use client";

import { Post } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import PostDetail from "../../../_component/PostDetail";
import getStudyDetail from "../_lib/getStudyDetail";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/store/auth";

export default function GetStudyDetail({ postId }: { postId: string }) {
  const accessToken = useRecoilValue(accessTokenState);
  const { data: post } = useQuery<Post, Object, Post, [_1: string, _2: string, _3: string]>({
    queryKey: ["community", "studies", postId],
    queryFn: ({ queryKey }) => getStudyDetail({ queryKey, accessToken }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!post) return null;

  return <PostDetail post={post} />;
}

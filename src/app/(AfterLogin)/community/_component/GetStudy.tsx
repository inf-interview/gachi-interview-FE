"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import { PostContent } from "@/model/Post";
import getStudies from "../_lib/getStudies";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/store/auth";

export default function GetStudy({
  tabParams,
  sortType,
  page,
}: {
  tabParams: string | undefined;
  sortType: string;
  page: number;
}) {
  const accessToken = useRecoilValue(accessTokenState);
  const { data, error, isLoading } = useQuery<
    PostContent,
    Object,
    PostContent,
    [_1: string, _2: string, _3: string, _4: number]
  >({
    queryKey: ["community", "studies", sortType, page],
    queryFn: ({ queryKey }) => getStudies({ queryKey, sortType, page, accessToken }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  if (data?.content.length == 0) {
    return <div>등록된 게시글이 없습니다🥲</div>;
  }

  return data?.content.map((post) => (
    <PostCard key={post.postId} post={post} tabParams={tabParams} />
  ));
}

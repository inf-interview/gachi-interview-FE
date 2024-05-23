"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import { Post } from "@/model/Post";
import getStudies from "../_lib/getStudies";

export default function GetStudy({
  tabParams,
  sortType,
  page,
}: {
  tabParams: string | undefined;
  sortType: string;
  page: number;
}) {
  const { data } = useQuery<
    Post[],
    Object,
    Post[],
    [_1: string, _2: string, _3: string, _4: number]
  >({
    queryKey: ["community", "studies", sortType, page],
    queryFn: ({ queryKey }) => getStudies({ queryKey, sortType, page }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <PostCard key={post.postId} post={post} tabParams={tabParams} />);
}

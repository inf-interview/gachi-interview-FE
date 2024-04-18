"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import { Post } from "@/model/Post";
import getStudies from "../_lib/getStudies";

export default function GetStudy({ tabParams }: { tabParams: string | undefined }) {
  const { data } = useQuery<Post[]>({
    queryKey: ["community", "studies"],
    queryFn: getStudies,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <PostCard key={post.postId} post={post} tabParams={tabParams} />);
}

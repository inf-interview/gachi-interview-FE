"use client";

import { useQuery } from "@tanstack/react-query";
import getReviews from "../_lib/getReviews";
import PostCard from "./PostCard";
import { Post } from "@/model/Post";

export default function InterviewReview({
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
    queryKey: ["community", "reviews", sortType, page],
    queryFn: ({ queryKey }) => getReviews({ queryKey, sortType, page }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <PostCard key={post.postId} post={post} tabParams={tabParams} />);
}

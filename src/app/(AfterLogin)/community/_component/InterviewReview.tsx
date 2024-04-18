"use client";

import { useQuery } from "@tanstack/react-query";
import getReviews from "../_lib/getReviews";
import PostCard from "./PostCard";
import { Post } from "@/model/Post";

export default function InterviewReview({ tabParams }: { tabParams: string | undefined }) {
  const { data } = useQuery<Post[]>({
    queryKey: ["community", "reviews"],
    queryFn: getReviews,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <PostCard key={post.postId} post={post} tabParams={tabParams} />);
}

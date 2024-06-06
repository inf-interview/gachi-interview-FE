"use client";

import { useQuery } from "@tanstack/react-query";
import getReviews from "../_lib/getReviews";
import PostCard from "./PostCard";
import { PostContent } from "@/model/Post";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "@/store/auth";
import NoData from "../../_component/NoData";

export default function InterviewReview({
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
    queryKey: ["community", "reviews", sortType, page],
    queryFn: ({ queryKey }) => getReviews({ queryKey, sortType, page, accessToken }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  if (data?.content?.length === 0) {
    return <NoData message="게시글이 아직 등록되지 않았네요...😰" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.content?.map((post) => (
        <PostCard key={post.postId} post={post} tabParams={tabParams} />
      ))}
    </div>
  );
}

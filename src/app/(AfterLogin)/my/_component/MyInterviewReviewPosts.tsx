import { useQuery } from "@tanstack/react-query";
import getMyReviews from "../_lib/getMyReviews";
import { Post } from "@/model/Post";
import PostCard from "../../community/_component/PostCard";

export default function MyInterviewReviewPosts({ tabParams }: { tabParams: string | undefined }) {
  const { data } = useQuery<Post[], Object, Post[], [_1: string, _2: string, _3: string]>({
    queryKey: ["community", "reviews", "my"],
    queryFn: getMyReviews,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <PostCard key={post.postId} post={post} tabParams={tabParams} />);
}

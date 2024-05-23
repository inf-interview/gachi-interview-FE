import { Post } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import getMyStudies from "../_lib/getMyStudies";
import PostCard from "../../community/_component/PostCard";

export default function MyGetStudyPosts({ tabParams }: { tabParams: string | undefined }) {
  const { data } = useQuery<Post[], Object, Post[], [_1: string, _2: string, _3: string]>({
    queryKey: ["community", "studies", "my"],
    queryFn: getMyStudies,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <PostCard key={post.postId} post={post} tabParams={tabParams} />);
}

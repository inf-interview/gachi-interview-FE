import { Post } from "@/model/Post";
import { useQuery } from "@tanstack/react-query";
import getMyStudies from "../_lib/getMyStudies";
import PostCard from "../../community/_component/PostCard";
import { useRecoilValue } from "recoil";
import { accessTokenState, userIdState } from "@/store/auth";

export default function MyGetStudyPosts({ tabParams }: { tabParams: string | undefined }) {
  const accessToken = useRecoilValue(accessTokenState);
  const userId = useRecoilValue(userIdState);

  const { data } = useQuery<Post[], Object, Post[], [_1: string, _2: string, _3: string]>({
    queryKey: ["community", "studies", "my"],
    queryFn: ({ queryKey }) => getMyStudies({ queryKey, userId, accessToken }),
  });

  const posts = Array.isArray(data) ? data : [];

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.postId} post={post} tabParams={tabParams} />)
      ) : (
        <div>아직 등록한 게시글이 없습니다🥲</div>
      )}
    </>
  );
}

import { useQuery } from "@tanstack/react-query";
import getMyComments from "../_lib/getMyComments";
import { useRecoilValue } from "recoil";
import { accessTokenState, userIdState } from "@/store/auth";
import CommentCard from "./CommentCard";

export interface MyComment {
  commentId: number;
  userId: number;
  username: string;
  content: string;
  category: string;
  postId: string;
  videoId: string;
}

export default function MyComments() {
  const accessToken = useRecoilValue(accessTokenState);
  const userId = useRecoilValue(userIdState);

  const { data } = useQuery<MyComment[]>({
    queryKey: ["my", "comments"],
    queryFn: () => getMyComments({ userId, accessToken }),
  });

  const comments = Array.isArray(data) ? data : [];

  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment) => <CommentCard key={comment.commentId} comment={comment} />)
      ) : (
        <div>아직 등록한 댓글이 없습니다🥲</div>
      )}
    </>
  );
}

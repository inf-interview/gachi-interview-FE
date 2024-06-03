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
}

export default function MyComments() {
  const accessToken = useRecoilValue(accessTokenState);
  const userId = useRecoilValue(userIdState);

  const { data: comments } = useQuery<MyComment[]>({
    queryKey: ["my", "comments"],
    queryFn: () => getMyComments({ userId, accessToken }),
  });

  return comments?.map((comment) => <CommentCard key={comment.commentId} comment={comment} />);
}

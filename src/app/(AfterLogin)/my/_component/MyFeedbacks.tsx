import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { accessTokenState, userIdState } from "@/store/auth";
import getMyFeedbacks from "../_lib/getMyFeedbacks";
import FeedbackCard from "./FeedbackCard";

export interface MyFeedback {
  commentId: number;
  userId: number;
  content: string;
  videoId: string;
}

export default function MyFeedbacks() {
  const accessToken = useRecoilValue(accessTokenState);
  const userId = useRecoilValue(userIdState);

  const { data } = useQuery<MyFeedback[]>({
    queryKey: ["my", "feedbacks"],
    queryFn: () => getMyFeedbacks({ userId, accessToken }),
  });

  const comments = Array.isArray(data) ? data : [];

  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment) => <FeedbackCard key={comment.commentId} comment={comment} />)
      ) : (
        <div>아직 등록한 피드백이 없습니다🥲</div>
      )}
    </>
  );
}

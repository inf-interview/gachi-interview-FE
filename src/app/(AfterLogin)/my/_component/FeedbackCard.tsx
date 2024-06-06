import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { MyFeedback } from "./MyFeedbacks";

export default function FeedbackCard({ comment }: { comment: MyFeedback }) {
  return (
    <Link href={`videos/${comment.videoId}?commentId=${comment.commentId}`}>
      <Card>
        <CardHeader>
          <CardDescription className="text-sm text-gray-500">인터뷰 영상 게시글</CardDescription>
        </CardHeader>
        <CardContent className="truncate overflow-hidden">내 피드백: {comment.content}</CardContent>
      </Card>
    </Link>
  );
}

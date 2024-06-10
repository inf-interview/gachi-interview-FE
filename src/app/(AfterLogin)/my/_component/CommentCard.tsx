import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { MyComment } from "./MyComments";
import Link from "next/link";

export default function CommentCard({ comment }: { comment: MyComment }) {
  return (
    <Link href={`community/${comment.category}/${comment.postId}?commentId=${comment.commentId}`}>
      <Card>
        <CardHeader>
          <CardDescription className="text-sm text-gray-500">
            {comment.category === "reviews" ? "면접 후기 게시글" : "스터디 모집 게시글"}
          </CardDescription>
        </CardHeader>
        <CardContent className="truncate overflow-hidden">내 댓글: {comment.content}</CardContent>
      </Card>
    </Link>
  );
}

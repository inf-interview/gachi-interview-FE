import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { MyComment } from "./MyComments";

export default function CommentCard({ comment }: { comment: MyComment }) {
  return (
    <Card>
      <CardHeader>
        {/* <CardDescription className="text-sm text-gray-500">{createdAt}</CardDescription> */}
      </CardHeader>
      <CardContent>댓글 내용: {comment.content}</CardContent>
    </Card>
  );
}

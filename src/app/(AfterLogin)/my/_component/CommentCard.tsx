import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

interface CommentProps {
  username: string;
  content: string;
  createdAt: string;
}

const CommentCard = ({ username, content, createdAt }: CommentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-sm text-gray-500">{username}</CardDescription>
        <CardDescription className="text-sm text-gray-500">{createdAt}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default CommentCard;

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PostProps {
  postId: number;
  title: string;
  commentCount: number;
  content: string;
  time: string;
  tags: string[];
}

const PostCard = ({ postId, title, commentCount, content, time, tags }: PostProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-sm text-gray-500">{time}</CardDescription>
        <Separator className="w-full my-2" />
      </CardHeader>
      <CardContent className="h-40">{content}</CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm text-gray-500 mr-2 bg-gray-100 rounded-lg px-2 py-1
            "
            >
              #{tag}
            </span>
          ))}
        </div>
        <p
          className="text-sm text-gray-500 ml-2
        "
        >
          댓글 {commentCount}개
        </p>
      </CardFooter>
    </Card>
  );
};

export default PostCard;

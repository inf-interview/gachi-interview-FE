import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

interface PostProps {
  postId: number;
  title: string;
  commentCount: number;
  content: string;
  time: string;
  tags: string[];
  likeCount: number;
}

const PostCard = ({ postId, title, commentCount, content, time, tags, likeCount }: PostProps) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <p
          className="
            h-32
          text-gray-600 text-base overflow-hidden
            
          "
        >
          {content}
        </p>
      </CardContent>
      <CardFooter className="flex-col items-start justify-start">
        <div className="flex flex-wrap mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} className="mt-2 px-3 py-1 text-sm mr-1" variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="flex w-full justify-between items-center">
          <p className="text-gray-600 text-sm mt-2">{time}</p>
          <div className="flex mt-2">
            <div className="flex items-center">
              <AiOutlineLike className="text-gray-500 mr-1" />
              <span className="text-gray-700">{likeCount}</span>
            </div>
            <div className="flex items-center ml-3">
              <FaRegComment className="text-gray-500 mr-1" />
              <span className="text-gray-700">{commentCount}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;

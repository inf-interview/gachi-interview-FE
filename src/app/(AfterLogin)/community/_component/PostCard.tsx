import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/model/Post";
import Link from "next/link";

export default function PostCard({
  post,
  tabParams,
}: {
  post: Post;
  tabParams: string | undefined;
}) {
  return (
    <Link href={`/community/${tabParams}/${post.postId}`}>
      <Card>
        <CardHeader>
          <CardTitle>{post.postTitle}</CardTitle>
          <hr />
          <CardDescription>{post.postContent}</CardDescription>
        </CardHeader>
        {post.tags.map((tag, index) => (
          <Badge
            key={index}
            className={`px-3 py-1 text-sm ${index === 0 ? "ml-4" : "mx-1"}`}
            variant="secondary"
          >
            #{tag}
          </Badge>
        ))}
        <div className="px-6 pt-4 pb-2">
          <div className="flex">
            <div className="flex items-center">
              <AiOutlineLike className="text-gray-500 mr-1" />
              <span className="text-gray-700 text-sm">{post.numOfLike}</span>
            </div>
            <div className="flex items-center ml-3">
              <FaRegComment className="text-gray-500 mr-1" />
              <span className="text-gray-700 text-sm">{post.numOfComment}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            {post.User.userName} • {post.updateTime.toLocaleString()}
          </p>
        </div>
      </Card>
    </Link>
  );
}

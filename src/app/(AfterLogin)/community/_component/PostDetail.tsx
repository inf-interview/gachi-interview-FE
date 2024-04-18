import Comment from "@/app/(AfterLogin)/_component/Comment";
import CreateComment from "@/app/(AfterLogin)/_component/CommentForm";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/model/Post";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

export default function PostDetail({ post }: { post: Post }) {
  return (
    <div className="flex-col">
      <div className="w-2/3 px-6 pt-4 pb-2 border border-gray-300 rounded-md">
        <span className="text-2xl font-bold">{post.postTitle}</span>
        <hr className="mt-2" />
        <p className="my-5">{post.content}</p>
        {post.tags.map((tag, index) => (
          <Badge
            key={index}
            className={`px-3 py-1 text-sm ${index === 0 ? "ml-0" : "mx-1"}`}
            variant="secondary"
          >
            #{tag}
          </Badge>
        ))}
        <div className="flex my-3">
          <p className="flex-1 text-gray-600 text-sm mt-2">
            {post.User.userName} • {post.updateTime.toLocaleString()}
          </p>
          <div className="flex">
            <div className="flex items-center">
              <AiOutlineLike className="text-gray-500 mr-1" />
              <span className="text-gray-700 text-sm">3</span>
            </div>
            <div className="flex items-center ml-3">
              <FaRegComment className="text-gray-500 mr-1" />
              <span className="text-gray-700 text-sm">5</span>
            </div>
          </div>
        </div>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <CreateComment />
    </div>
  );
}

import { useState } from "react";
import CommentForm from "@/app/(AfterLogin)/_component/CommentForm";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/model/Post";
import { AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { usePostLike } from "../../videos/_lib/queries/useInterviewQuery";
import { formatRelativeTime } from "@/lib/utills/days";
import { Button } from "@/components/ui/button";
import "./PostDetail.css";

export default function PostDetail({ post }: { post: Post }) {
  const { mutate } = usePostLike();
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      mutate({
        userId: 1,
        id: post.postId.toString(),
        type: "board",
        queryKeyPrefix: ["community", post.category],
      });
      setIsLiked(true);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    } else {
      // TODO: 좋아요 취소
      setIsLiked(false);
    }
  };

  return (
    <div className="flex-col">
      <div className="px-6 pt-4 pb-2 mb-5 border border-gray-300 rounded-md">
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
          <div className="flex items-center flex-1 mt-2">
            <img
              src="data:image/jpeg;base64,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"
              alt="user"
              className="w-4 h-4 rounded-full"
            />
            <p className="text-gray-600 text-sm ml-2">
              <span className="font-semibold">{post.User.userName}</span> •{" "}
              {formatRelativeTime(post.updateTime.toLocaleString())}
            </p>
          </div>
          <div className="flex">
            <div className="flex items-center w-full justify-center">
              <Button
                variant="outline"
                onClick={handleLike}
                className={`${animate ? "animate-ping" : ""}`}
              >
                <AiOutlineLike className={`mr-1 ${isLiked ? "text-green-500" : "text-gray-500"}`} />
                <span
                  className={`text-sm ${
                    isLiked ? "text-green-500 font-semibold" : "text-gray-700"
                  }`}
                >
                  {post.numOfLike}
                </span>
              </Button>
              <Button variant="outline" className="ml-2">
                <AiOutlineShareAlt className="mr-2" />
                공유
              </Button>
            </div>
            <div className="flex items-center ml-3">
              <FaRegComment className="text-gray-500 mr-1" />
              <span className="text-gray-700 text-sm">5</span>
            </div>
          </div>
        </div>
      </div>
      <CommentForm postId={post.postId} />
    </div>
  );
}

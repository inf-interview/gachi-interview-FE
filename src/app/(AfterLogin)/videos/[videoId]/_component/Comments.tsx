"use client";

import { useGetCommentsQuery } from "../../_lib/queries/useCommentQuery";
import CreateComment from "./CreateComment";
import Comment from "./Comment";
import Loading from "@/app/(AfterLogin)/_component/Loading";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface CommentsProps {
  videoId: string;
}

const Comments = ({ videoId }: CommentsProps) => {
  const { data: comments, isLoading } = useGetCommentsQuery(videoId);
  const searchParams = useSearchParams();
  const commentId = searchParams.get("commentId");

  useEffect(() => {
    if (commentId) {
      const element = document.getElementById(commentId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        element.classList.add("highlight");
        setTimeout(() => {
          element.classList.remove("highlight");
        }, 1800);
      }
    }
  }, [commentId, comments]);

  // TODO: Error 컴포넌트 추가
  if (isLoading) return <Loading />;
  if (!comments) return <CreateComment videoId={videoId} />;

  // TODO: userId 수정
  return (
    <div className="flex flex-col mt-8 pb-8">
      <h2 className="text-2xl font-bold">피드백 {comments.length || ""}</h2>
      <CreateComment videoId={videoId} />
      {comments.map((comment, index) => (
        <Comment key={index} videoId={videoId} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;

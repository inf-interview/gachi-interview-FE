"use client";

import { useGetCommentsQuery } from "../../_lib/queries/useCommentQuery";
import CreateComment from "./CreateComment";
import Comment from "./Comment";

interface CommentsProps {
  videoId: string;
}

const Comments = ({ videoId }: CommentsProps) => {
  const { data: comments, isLoading } = useGetCommentsQuery(videoId);

  // TODO: Loading, Error 컴포넌트 추가
  if (isLoading) return <div>Loading...</div>;
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

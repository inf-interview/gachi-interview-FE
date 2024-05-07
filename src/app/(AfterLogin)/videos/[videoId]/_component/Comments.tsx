"use client";

import { formatRelativeTime } from "@/lib/utills/days";
import { useGetCommentsQuery } from "../../_lib/queries/useCommentQuery";
import CreateComment from "./CreateComment";

interface CommentsProps {
  videoId: string;
}

const Comments = ({ videoId }: CommentsProps) => {
  const { data: comments, isLoading } = useGetCommentsQuery(videoId);

  // TODO: Loading, Error 컴포넌트 추가
  if (isLoading) return <div>Loading...</div>;
  if (!comments) return <CreateComment videoId={videoId} />;

  return (
    <div className="flex flex-col mt-8">
      <h2 className="text-2xl font-bold">피드백 {comments.length || ""}</h2>
      <CreateComment videoId={videoId} />
      {comments.map((comment, index) => (
        <div key={index} className="flex flex-col mt-4">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full object-cover"
              // TODO: 이미지 경로 수정
              src="https://file.mk.co.kr/meet/neds/2020/03/image_readtop_2020_256728_15839167074119784.jpg"
              alt="프로필 이미지"
            />
            <div className="flex flex-col ml-4">
              <span className="font-bold">{comment.userName}</span>
              <span className="text-gray-500">{formatRelativeTime(comment.createdAt)}</span>
            </div>
          </div>
          <p className="mt-4">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;

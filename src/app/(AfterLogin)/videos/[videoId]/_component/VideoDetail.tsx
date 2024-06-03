"use client";

import { AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import { useGetInterview, usePostLike } from "../../_lib/queries/useInterviewQuery";
import { formatRelativeTime } from "@/lib/utills/days";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "@/app/(AfterLogin)/community/_component/PostDetail.css";
import { useRecoilValue } from "recoil";
import { userIdState } from "@/store/auth";

interface VideoDetailProps {
  videoId: string;
}

const VideoDetail = ({ videoId }: VideoDetailProps) => {
  const { data: videoData, error, isLoading } = useGetInterview(videoId);
  const { mutate } = usePostLike();
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const userId = useRecoilValue(userIdState);

  const handleLike = () => {
    if (!isLiked) {
      mutate({
        userId,
        id: videoId,
        type: "video",
        queryKeyPrefix: ["interview"],
      });
      setIsLiked(true);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    } else {
      // TODO: 좋아요 취소
      setIsLiked(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // TODO: Loading, Error 컴포넌트 추가
  if (!videoData) return null;

  // TODO: 본인의 비디오인 경우 수정, 삭제 버튼 추가
  return (
    <>
      <div className="flex justify-center w-full">
        <video className="w-full object-cover rounded-lg" src={videoData.videoLink} controls />
      </div>
      <div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between mt-2">
            <h1 className="text-3xl font-bold">{videoData.videoTitle}</h1>
            <p className="text-gray-500 text-sm">{formatRelativeTime(videoData.time)}</p>
          </div>
          <p>{videoData.userName}</p>

          <div className="flex mt-4">
            {videoData.tags.map((tag, index) => (
              <Badge
                key={index}
                className={`px-3 py-1 text-sm ${index === 0 ? "ml-0" : "mx-1"}`}
                variant="secondary"
              >
                #{tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center w-full justify-center">
            <Button
              variant="outline"
              onClick={handleLike}
              className={animate ? "animate-ping" : ""}
            >
              <AiOutlineLike className={`mr-2 ${isLiked ? "text-green-500" : "text-gray-500"}`} />
              <span
                className={`text-sm ${isLiked ? "text-green-500 font-semibold" : "text-gray-700"}`}
              >
                {videoData.numOfLike}
              </span>
            </Button>
            <Button variant="outline" className="ml-2">
              <AiOutlineShareAlt className="mr-2" />
              공유
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;

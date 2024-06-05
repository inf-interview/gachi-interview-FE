"use client";

import { AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import {
  useDeleteInterview,
  useGetInterview,
  usePatchInterview,
  usePostLike,
} from "../../_lib/queries/useInterviewQuery";
import { formatRelativeTime } from "@/lib/utills/days";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import "@/app/(AfterLogin)/community/_component/PostDetail.css";
import { useRecoilValue } from "recoil";
import { userIdState } from "@/store/auth";
import { useModal } from "@/components/Modal/useModal";
import VideoDetailEditModal from "./VideoDetailEditModal";
import { VideoData } from "./VideoDetailEditModal";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

interface VideoDetailProps {
  videoId: string;
}

const VideoDetail = ({ videoId }: VideoDetailProps) => {
  const { data: videoData, error, isLoading } = useGetInterview(videoId);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: modifyPostMutate, isSuccess: isModifySuccess } = usePatchInterview();
  const { mutate: deletePostMutate, isSuccess: isDeleteSuccess } = useDeleteInterview();
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const userId = useRecoilValue(userIdState);
  const { openModal, closeDialog, openDialog } = useModal();
  const router = useRouter();

  const handleLike = () => {
    likeMutate({
      userId,
      id: videoId,
      type: "video",
    });
    setIsLiked(true);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  useEffect(() => {
    if (isModifySuccess) {
      closeDialog();
    }
  }, [isModifySuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      openDialog(`"${videoData?.videoTitle}" 영상이 삭제되었습니다.`);
      router.push("/videos");
    }
  }, [isDeleteSuccess]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // TODO: Loading, Error 컴포넌트 추가
  if (!videoData) return null;

  const openEditModal = () => {
    const handleModify = (video: VideoData) => {
      modifyPostMutate({
        userId: video.userId,
        videoId: video.videoId,
        videoTitle: video.videoTitle,
        tags: video.tags,
        exposure: video.exposure,
      });
    };

    openModal(
      <VideoDetailEditModal
        disableBackdropClick={true}
        video={{
          videoTitle: videoData.videoTitle,
          tags: videoData.tags,
          exposure: videoData.exposure,
          videoId: videoData.videoId.toString(),
          userId: videoData.userId,
        }}
        onSubmit={handleModify}
      />,
    );
  };

  const openDeleteModal = () => {
    const handleDelete = () => {
      deletePostMutate({ userId, videoId: Number(videoId) });
    };

    openModal(
      <Modal
        header={<h1 className="text-2xl font-bold">정말 삭제할까요?</h1>}
        footer={
          <>
            <Button className="" variant="secondary" onClick={closeDialog}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              삭제
            </Button>
          </>
        }
      >
        <p>정말 삭제하시겠습니까?</p>
      </Modal>,
    );
  };

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
              <AiOutlineLike
                className={`mr-2 ${videoData.liked ? "text-green-500" : "text-gray-500"}`}
              />
              <span
                className={`text-sm ${
                  videoData.liked ? "text-green-500 font-semibold" : "text-gray-700"
                }`}
              >
                {videoData.numOfLike}
              </span>
            </Button>
            <Button variant="outline" className="ml-2">
              <AiOutlineShareAlt className="mr-2" />
              공유
            </Button>
            {userId === videoData.userId && (
              <div className="flex ml-2">
                <Button variant="outline" className="mr-2" onClick={openEditModal}>
                  수정
                </Button>
                <Button variant="outline" onClick={openDeleteModal}>
                  삭제
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDetail;

import Modal from "@/components/Modal";
import { useModal } from "@/components/Modal/useModal";
import { Video } from "@/model/Video";
import { useState } from "react";

export type VideoData = Pick<Video, "videoTitle" | "tags" | "exposure" | "videoId" | "userId">;

interface VideoDetailEditModalProps {
  video: VideoData;
  onSubmit: (data: VideoData) => void;
  disableBackdropClick: boolean;
}

const VideoDetailEditModal = ({ video, onSubmit }: VideoDetailEditModalProps) => {
  const [videoTitle, setVideoTitle] = useState(video.videoTitle);
  const [tags, setTags] = useState(video.tags);
  const [tagsInput, setTagsInput] = useState("");
  const [exposure, setExposure] = useState(video.exposure);
  const { closeModal } = useModal();

  const handleVideoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(e.target.value);
  };

  const handleAddTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return; // 한글 두번 호출 방지
    if (e.key === "Enter" && tagsInput.trim()) {
      console.log(e);

      e.preventDefault();
      setTags([...tags, tagsInput.trim()]);
      setTagsInput("");
    }
  };

  const handleDeleteTags = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleTagsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
  };

  const handleExposure = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExposure(e.target.checked);
  };

  const handleSubmit = () => {
    onSubmit({
      videoTitle,
      tags,
      exposure,
      videoId: video.videoId,
      userId: video.userId,
    });
  };

  return (
    <Modal
      header={<h1 className="text-2xl font-bold">비디오 수정</h1>}
      footer={
        <>
          <button
            className="px-4 py-2 text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            수정
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">제목</label>
          <input
            type="text"
            value={videoTitle}
            onChange={handleVideoTitle}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">태그</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                onClick={() => handleDeleteTags(index)}
                className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-full cursor-pointer"
              >
                {tag}
                <svg
                  className="w-4 h-4 ml-1 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            ))}
            <input
              type="text"
              value={tagsInput}
              onChange={handleTagsInput}
              onKeyDown={handleAddTags}
              placeholder="태그 작성 후 Enter를 눌러주세요."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label className="block text-sm font-medium text-gray-700">공개 여부</label>
          <input
            type="checkbox"
            checked={exposure}
            onChange={handleExposure}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
      </div>
    </Modal>
  );
};

export default VideoDetailEditModal;

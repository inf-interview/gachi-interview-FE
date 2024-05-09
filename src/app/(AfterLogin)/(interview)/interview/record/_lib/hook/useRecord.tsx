import { useInterviewOption } from "@/app/(AfterLogin)/(interview)/_lib/contexts/InterviewOptionContext";
import { getSupportedMimeTypes } from "@/lib/utills/media";
import { useEffect, useRef, useState } from "react";
import useTimer from "./useTimer";
import {
  EncodingWebmToMp4,
  localDownload,
  startRecording,
  stopRecording,
  getThumbnailImages,
} from "@/lib/utills/record";
import { getPutCommandObject } from "../uploadVideo";
import { useModal } from "@/components/Modal/useModal";
import VideoMetadataModal from "../../_component/VideoMetadataModal";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { usePostInterviewMutation } from "../queries/useInterviewQuery";

const useRecord = () => {
  const { interviewOption, mediaOption, setMediaOption } = useInterviewOption();
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const { openDialog, closeDialog, openModal, closeModal } = useModal();
  const [isRecording, setIsRecording] = useState(false);
  const { mutate, isSuccess } = usePostInterviewMutation();

  const videoRef = useRef<HTMLVideoElement>(null);
  const questionList = interviewOption.questions;

  const { time, pause, start, reset } = useTimer({
    endSeconds: 300, // 5분
    onStop: () => {
      stopRecordHandler();
    },
  });

  const startRecordHandler = () => {
    if (!mediaOption.media) {
      setMediaOption({
        ...mediaOption,
        media: new MediaStream(),
      });
    }

    const option = {
      media: mediaOption.media,
      selectedMimeType: getSupportedMimeTypes(),
      mediaRecorderRef: mediaOption.mediaRecorderRef,
      setRecordedBlobs,
    };

    setIsRecording(true);
    startRecording(option);
    start();
  };

  const stopRecordHandler = async () => {
    try {
      setIsRecording(false);
      await stopRecording(mediaOption.mediaRecorderRef);
      pause();
      // openDialog("인코딩 중...");
      // TODO: 유니크한 파일명 지정
      const fileNames = "test";
      if (recordedBlobs.length === 0) return;
      const blob = new Blob(recordedBlobs, { type: getSupportedMimeTypes() });
      const thumbnails = await getThumbnailImages(blob, time);

      const handleModalSubmit = async (metadata: {
        title: string;
        tags: string[];
        thumbnail: Blob;
        public: boolean;
      }) => {
        const encodedBlob = await EncodingWebmToMp4(blob);

        // S3 업로드 로직
        const videoUrl = await getPutCommandObject(fileNames + ".mp4", encodedBlob, "video/mp4");
        const thumbnailUrl = await getPutCommandObject(
          fileNames + "-thumbnail.png",
          metadata.thumbnail,
          "image/png",
        );

        if (!videoUrl || !thumbnailUrl) {
          console.error("업로드 실패");
          return;
        }

        console.log(thumbnailUrl);

        // TODO: 백엔드에 POST할 mutation 호출
        const response = mutate({
          // TODO: 유저 아이디 넘겨주기
          userId: 1,
          videoLink: videoUrl,
          thumbnailLink: thumbnailUrl,
          videoTitle: metadata.title,
          tags: metadata.tags,
          isPublic: metadata.public,
          questions: questionList.map((question) => question.questionId),
        });

        if (isSuccess) {
          console.log("업로드 성공");
        }

        openModal(
          // TODO: 업로드 완료 모달 컴포넌트로 분리
          <Modal header="업로드 완료" footer={<Button onClick={closeModal}>확인하러 가기</Button>}>
            <p>------------------</p>
            <p>비디오 링크: {videoUrl}</p>
            <br />
            <p>썸네일 링크: {thumbnailUrl}</p>
            <p>---이부분은 테스트용---</p>
            <br />
            <p>비디오 인코딩이 완료되었어요</p>
            <p>🤖 AI 영상 분석이 완료되면 알림을 보내드릴게요!</p>
            영상을 기기에 다운로드 하시고 싶으시면 아래 버튼을 눌러주세요.
            <br />
            <div>
              <Button
                onClick={() => {
                  localDownload(encodedBlob as Blob);
                }}
              >
                다운로드
              </Button>
              <Button
                // TODO: 클립보드에 복사하는 기능 추가
                onClick={() => {
                  console.log("copy to clipboard");
                }}
              >
                영상 링크 공유하기
              </Button>
            </div>
          </Modal>,
        );
      };

      openModal(
        <VideoMetadataModal
          onSubmit={handleModalSubmit}
          disableBackdropClick={true}
          thumbnails={thumbnails}
        />,
      );
    } catch (error) {
      console.error("녹화 중 오류가 발생했습니다.");
      console.log(error);
    }
    setRecordedBlobs([]);
  };

  const downloadHandler = async () => {
    const blob = new Blob(recordedBlobs, { type: getSupportedMimeTypes() });
    const encodedBlob = await EncodingWebmToMp4(blob);
    localDownload(encodedBlob);
  };

  useEffect(() => {
    return () => {
      stopRecording(mediaOption.mediaRecorderRef);
      setRecordedBlobs([]);
      reset();
    };
  }, []);

  return {
    videoRef,
    questionList,
    time,
    startRecordHandler,
    stopRecordHandler,
    downloadHandler,
    isRecording,
  };
};

export default useRecord;

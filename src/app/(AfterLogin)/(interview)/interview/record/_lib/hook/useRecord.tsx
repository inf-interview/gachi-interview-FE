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
import { usePostInterviewMutation } from "../queries/useInterviewQuery";
import UploadCompletionModal from "../../_component/UploadCompletionModal";
import { userIdState } from "@/store/auth";
import { useRecoilValue } from "recoil";

const useRecord = () => {
  const { interviewOption, mediaOption, setMediaOption } = useInterviewOption();
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const { openModal } = useModal();
  const [isRecording, setIsRecording] = useState(false);
  const { mutate } = usePostInterviewMutation();
  const userId = useRecoilValue(userIdState);

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

  // stopRecordHandler에서 record 기능 뿐만 아니라 업로드, 모달 open 등의 기능을 수행하는게 너무 많은 역할을 하고 있는 것 같음...
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
      const encodingPromise = EncodingWebmToMp4(blob);

      const handleModalSubmit = async (metadata: {
        title: string;
        tags: string[];
        thumbnail: Blob;
        exposure: boolean;
      }) => {
        const encodedBlob = await encodingPromise;
        // S3 업로드 로직
        const [videoUrl, thumbnailUrl] = await Promise.all([
          getPutCommandObject(fileNames + ".mp4", encodedBlob, "video/mp4"),
          getPutCommandObject(fileNames + "-thumbnail.png", metadata.thumbnail, "image/png"),
        ]);

        if (!videoUrl || !thumbnailUrl) {
          console.error("업로드 실패");
          return;
        }

        // TODO: 유저 아이디 넘겨주기
        mutate({
          userId,
          videoLink: videoUrl,
          thumbnailLink: thumbnailUrl,
          videoTitle: metadata.title,
          tags: metadata.tags,
          exposure: metadata.exposure,
          questions: questionList.map((question) => question.questionId),
        });

        openModal(<UploadCompletionModal encodedBlob={encodedBlob} isPublic={metadata.exposure} />);
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

      // 미디어 스트림의 모든 트랙 중지
      if (mediaOption.mediaRecorderRef.current) {
        const stream = mediaOption.mediaRecorderRef.current.stream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => {
            track.stop();
          });
        }
      }

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

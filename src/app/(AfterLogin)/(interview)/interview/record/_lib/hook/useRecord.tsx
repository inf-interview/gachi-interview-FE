import { useInterviewOption } from "@/app/(AfterLogin)/(interview)/_lib/contexts/InterviewOptionContext";
import { getSupportedMimeTypes } from "@/lib/utills/media";
import { useCallback, useEffect, useRef, useState } from "react";
import useTimer from "./useTimer";
import {
  EncodingWebmToMp4,
  localDownload,
  startRecording,
  stopRecording,
  getThumbnailImages,
} from "@/lib/utills/record";
import useSpeech from "./useSpeech";
import { useModal } from "@/components/Modal/useModal";
import { getPutCommandObject } from "../uploadVideo";
import { usePostInterviewMutation } from "../queries/useInterviewQuery";
import { usePostFeedbackMutation } from "../queries/useFeedbackQuery";
import UploadCompletionModal from "../../_component/UploadCompletionModal";
import VideoMetadataModal from "../../_component/VideoMetadataModal";
import { userIdState } from "@/store/auth";
import { useRecoilValue } from "recoil";

const useRecord = () => {
  const { interviewOption, mediaOption, setMediaOption } = useInterviewOption();
  const { mutateAsync: postInterviewMutate } = usePostInterviewMutation(); // 비디오 업로드 후 videoId를 사용하기 위해 async-mutate 사용
  const { mutate: postFeedbackMutate } = usePostFeedbackMutation();
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const { openModal } = useModal();
  const [isRecording, setIsRecording] = useState(false);
  const userId = useRecoilValue(userIdState);
  const { onStartListening, onStopListening, transcript } = useSpeech();

  const videoRef = useRef<HTMLVideoElement>(null);
  const questionList = interviewOption.questions;

  // 5분이 지나면 자동으로 녹화 종료 로직을 수행한다.
  const { time, pause, start, reset } = useTimer({
    endSeconds: 5 * 60, // 5분
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
    onStartListening(); // 음성인식 시작
    start();
  };

  // stopRecordHandler에서 record 기능 뿐만 아니라 업로드, 모달 open 등의 기능을 수행하는게 너무 많은 역할을 하고 있는 것 같음...
  const stopRecordHandler = useCallback(async () => {
    try {
      setIsRecording(false);
      await stopRecording(mediaOption.mediaRecorderRef);
      onStopListening(); // 음성인식 종료
      pause(); // 타이머 일시정지
      // openDialog("인코딩 중...");
      // TODO: 유니크한 파일명 지정
      const fileNames = "interview-" + new Date().getTime() + "-" + userId;
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

        // 인터뷰 POST
        const data = await postInterviewMutate({
          userId,
          videoLink: videoUrl,
          thumbnailLink: thumbnailUrl,
          videoTitle: metadata.title,
          tags: metadata.tags,
          exposure: metadata.exposure,
          questions: questionList.map((question) => question.questionId),
        });

        // 피드백 POST
        postFeedbackMutate({
          videoId: data?.videoId,
          content: transcript,
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
  }, [recordedBlobs]);

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

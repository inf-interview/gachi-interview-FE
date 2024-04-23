"use client";

import { useInterviewOption } from "../../_lib/contexts/InterviewOptionContext";
import { startRecording, stopRecording, localDownload } from "@/lib/utills/record";
import { getSupportedMimeTypes } from "@/lib/utills/media";
import { useEffect, useRef, useState } from "react";
import { QuestionViewer, AnswerViewer } from "./_component/Viewer";
import useTimer from "./_lib/useTimer";
import Timer from "./_component/Timer";
import Controller from "./_component/Controller";

const RecordPage = () => {
  const { interviewOption, mediaOption, setMediaOption } = useInterviewOption();
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const questionList = interviewOption.questions;
  const [script, setScript] = useState<{
    questionId: number;
    answerId: number;
    showAnswer: boolean;
  }>({ questionId: 0, answerId: 0, showAnswer: false });

  const { time, pause, start, reset } = useTimer({
    endSeconds: 300,
    onEnd: () => {
      // console.log("end");
    },
  });

  // TODO: 녹화 컨트롤러 커스텀 훅으로 분리
  // 타이머, 녹화 시작, 녹화 종료, 다운로드, 현재 질문, 썸네일 캡쳐, AWS에 업로드

  const startRecordHandler = () => {
    const option = {
      media: mediaOption.media,
      selectedMimeType: getSupportedMimeTypes(),
      mediaRecorderRef: mediaOption.mediaRecorderRef,
      setRecordedBlobs,
    };

    startRecording(option);
    start();
  };

  const stopRecordHandler = () => {
    stopRecording(mediaOption.mediaRecorderRef);
    pause();
    downloadHandler();
    // 다운로드가 아닌 AWS에 업로드
  };

  const downloadHandler = () => {
    const blob = new Blob(recordedBlobs, { type: getSupportedMimeTypes() });
    localDownload(blob);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = mediaOption.media;
    }
  }, [mediaOption.media]);

  return (
    <div>
      <Timer seconds={time} />
      <div className="relative w-full h-full transform scale-x-[-1] rounded-lg">
        <QuestionViewer questionId={script.questionId} questionList={questionList} />
        <video
          className="display-block w-full h-full transform rounded-lg"
          ref={videoRef}
          autoPlay
          muted
          playsInline
        />
        {script.showAnswer && (
          <AnswerViewer answerId={script.answerId} questionList={questionList} />
        )}
      </div>
      <Controller
        setScript={setScript}
        onStartRecord={startRecordHandler}
        onStopRecord={stopRecordHandler}
        questionList={questionList}
        currentQuestionId={script.questionId}
      />
    </div>
  );
};

export default RecordPage;

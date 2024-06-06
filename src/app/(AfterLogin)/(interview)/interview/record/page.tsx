"use client";

import { useInterviewOption } from "../../_lib/contexts/InterviewOptionContext";
import { useEffect, useState } from "react";
import { QuestionViewer, AnswerViewer } from "./_component/Viewer";
import Timer from "./_component/Timer";
import Controller from "./_component/Controller";
import useRecord from "./_lib/hook/useRecord";

const RecordPage = () => {
  const [script, setScript] = useState<{
    questionId: number;
    showAnswer: boolean;
  }>({ questionId: 0, showAnswer: false });

  const { questionList, startRecordHandler, stopRecordHandler, time, videoRef, isRecording } =
    useRecord();
  const { mediaOption } = useInterviewOption();

  // TODO: 녹화 컨트롤러 커스텀 훅으로 분리
  // 타이머, 녹화 시작, 녹화 종료, 다운로드, 현재 질문, 썸네일 캡쳐, AWS에 업로드

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = mediaOption.media;
    }

    if (mediaOption.media) {
      mediaOption.media.getVideoTracks().forEach((track) => {
        track.onended = () => {
          stopRecordHandler();
        };
      });
    }
  }, [mediaOption.media]);

  return (
    <div>
      <div className="relative w-full h-full transform scale-x-[-1] bg-black rounded-lg">
        <Timer seconds={time} />
        <QuestionViewer questionId={script.questionId} questionList={questionList} />
        <video
          className="display-block w-full h-full transform rounded-lg max-h-[400px]"
          ref={videoRef}
          autoPlay
          muted
          playsInline
        />
        {script.showAnswer && (
          <AnswerViewer questionId={script.questionId} questionList={questionList} />
        )}
      </div>

      <Controller
        isRecording={isRecording}
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

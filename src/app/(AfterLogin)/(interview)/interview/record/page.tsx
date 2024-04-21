"use client";

import { useInterviewOption } from "../../_lib/contexts/InterviewOptionContext";
import { startRecording, stopRecording, localDownload } from "@/lib/utills/record";

import { getSupportedMimeTypes } from "@/lib/utills/media";
import { useEffect, useRef, useState } from "react";
import QuestionViewer from "./_component/QuestionViewer";

const RecordPage = () => {
  const { interviewOption, mediaOption, setMediaOption } = useInterviewOption();
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // const { data: questionList } = useQuery("questionList", async () => {
  //   const response = await getQuestions();
  //   return response.data;
  // });

  const questionList = [
    {
      questionId: 1,
      questionContent: "질문1",
      answerContent: "답변1",
      answerId: 1,
    },
    {
      questionId: 2,
      questionContent: "질문2",
      answerContent: "답변2",
      answerId: 2,
    },
    {
      questionId: 3,
      questionContent: "질문3",
      answerContent: "답변3",
      answerId: 3,
    },
  ];

  const startRecordHandler = () => {
    const option = {
      media: mediaOption.media,
      selectedMimeType: getSupportedMimeTypes(),
      mediaRecorderRef: mediaOption.mediaRecorderRef,
      setRecordedBlobs,
    };

    startRecording(option);
  };

  const stopRecordHandler = () => {
    stopRecording(mediaOption.mediaRecorderRef);
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
      <div className="relative w-full h-full transform scale-x-[-1] rounded-lg">
        <QuestionViewer currentQuestionId={1} questionList={questionList} />
        <video
          className="display-block w-full h-full transform scale-x-[-1] rounded-lg"
          ref={videoRef}
          autoPlay
          muted
          playsInline
        ></video>
      </div>
      <button onClick={startRecordHandler}>녹화시작</button>
      <button onClick={stopRecordHandler}>녹화종료</button>
      <button onClick={downloadHandler}>다운로드</button>
    </div>
  );
};

export default RecordPage;

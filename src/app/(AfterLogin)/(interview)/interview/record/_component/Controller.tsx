import { Button } from "@/components/ui/button";
import { Dispatch, useEffect, useState } from "react";
import { QuestionType } from "../../../_lib/contexts/InterviewOptionContext";
import { useModal } from "@/components/Modal/useModal";
import { useRouter } from "next/navigation";
import { BsCardText, BsCameraVideo, BsCameraVideoOff, BsFillCaretRightFill } from "react-icons/bs";

interface ControllerProps {
  setScript: Dispatch<
    React.SetStateAction<{
      questionId: number;
      showAnswer: boolean;
    }>
  >;
  onStartRecord: () => void;
  onStopRecord: () => void;
  questionList: QuestionType[];
  currentQuestionId: number;
  isRecording: boolean;
}

const Controller = ({
  setScript,
  onStartRecord,
  onStopRecord,
  questionList,
  currentQuestionId,
  isRecording,
}: ControllerProps) => {
  const { openDialog } = useModal();
  const router = useRouter();

  const startRecordHandler = () => {
    onStartRecord();
  };

  const stopRecordHandler = () => {
    onStopRecord();
  };

  const toggleShowAnswerHandler = () => {
    setScript((prev) => ({ ...prev, showAnswer: !prev.showAnswer }));
  };

  const nextQuestionHandler = () => {
    if (!questionList) return;
    if (questionList.at(-1)?.questionId === currentQuestionId) {
      openDialog("마지막 질문입니다.");
      return;
    }

    const currentIdx = questionList.findIndex(
      (question) => question.questionId === currentQuestionId,
    );
    const nextIdx = currentIdx + 1;
    setScript({
      questionId: questionList[nextIdx].questionId,
      showAnswer: false,
    });
  };

  useEffect(() => {
    if (questionList.length > 0) {
      setScript({
        questionId: questionList[0].questionId,
        showAnswer: false,
      });
    } else {
      router.push("/");
    }
  }, [questionList]);

  return (
    <div className="flex flex-row items-center mt-2">
      <Button
        className="w-full h-16 flex flex-col"
        variant="outline"
        onClick={toggleShowAnswerHandler}
      >
        <BsCardText />
        <span className="text-xs text-center mt-1">답변 보기</span>
      </Button>
      {isRecording ? (
        <Button
          className="w-full h-16 ml-2 flex flex-col"
          variant="outline"
          onClick={stopRecordHandler}
        >
          <BsCameraVideoOff className="text-red-500" />
          <span className="text-xs text-center mt-1 text-red-500">녹화 종료</span>
        </Button>
      ) : (
        <Button
          className="w-full h-16 ml-2 flex flex-col"
          variant="outline"
          onClick={startRecordHandler}
        >
          <BsCameraVideo />
          <span className="text-xs text-center mt-1">녹화 시작</span>
        </Button>
      )}
      <Button
        className="w-full h-16 ml-2 flex flex-col"
        variant="outline"
        onClick={nextQuestionHandler}
      >
        <BsFillCaretRightFill />
        <span className="text-xs text-center mt-1 text-primary">다음 질문</span>
      </Button>
    </div>
  );
};

export default Controller;

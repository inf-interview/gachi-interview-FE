import { Button } from "@/components/ui/button";
import { Dispatch, useEffect } from "react";
import { QuestionType } from "../../../_lib/contexts/InterviewOptionContext";
import { useModal } from "@/components/Modal/useModal";

interface ControllerProps {
  setScript: Dispatch<
    React.SetStateAction<{
      questionId: number;
      answerId: number;
      showAnswer: boolean;
    }>
  >;
  onStartRecord: () => void;
  onStopRecord: () => void;
  questionList: QuestionType[];
  currentQuestionId: number;
}

const Controller = ({
  setScript,
  onStartRecord,
  onStopRecord,
  questionList,
  currentQuestionId,
}: ControllerProps) => {
  const { openDialog } = useModal();

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
      answerId: questionList[nextIdx].answerId,
      showAnswer: false,
    });
  };

  useEffect(() => {
    if (questionList.length > 0) {
      setScript({
        questionId: questionList[0].questionId,
        answerId: questionList[0].answerId,
        showAnswer: false,
      });
    }
  }, [questionList]);

  return (
    <div className="flex flex-row items-center mt-2">
      <Button className="w-full" variant="outline" onClick={toggleShowAnswerHandler}>
        답변 보기
      </Button>
      <Button className="w-full ml-2" variant="outline" onClick={nextQuestionHandler}>
        다음 질문
      </Button>
      <Button className="w-full ml-2" variant="outline" onClick={() => onStartRecord()}>
        녹화 시작
      </Button>
      <Button className="w-full ml-2" variant="outline" onClick={() => onStopRecord()}>
        녹화 종료
      </Button>
    </div>
  );
};

export default Controller;

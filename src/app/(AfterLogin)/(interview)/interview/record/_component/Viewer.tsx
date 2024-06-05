import { QuestionType } from "../../../_lib/contexts/InterviewOptionContext";

interface QuestionListViewerProps {
  questionId: number;
  questionList: QuestionType[];
}

export const QuestionViewer = ({ questionId, questionList }: QuestionListViewerProps) => {
  return (
    <p className="absolute top-0 m-4 right-0 bg-black bg-opacity-50 p-4 rounded-lg text-white text-sm z-10 scale-x-[-1]">
      Q. {questionList.find((question) => question.questionId === questionId)?.questionContent}
    </p>
  );
};

interface AnswerViewerProps {
  questionId: number;
  questionList: QuestionType[];
}
export const AnswerViewer = ({ questionId, questionList }: AnswerViewerProps) => {
  return (
    <p className="absolute bottom-0 m-4 right-0 bg-black bg-opacity-50 p-4 rounded-lg text-white text-xs z-10 scale-x-[-1] overflow-auto">
      A. {questionList.find((question) => question.questionId === questionId)?.answerContent}
    </p>
  );
};

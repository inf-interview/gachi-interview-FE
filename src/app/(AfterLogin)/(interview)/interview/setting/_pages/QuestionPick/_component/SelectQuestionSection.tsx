import { useInterviewOption } from "../../../../../_lib/contexts/InterviewOptionContext";
import { useGetQuestions } from "../../../_lib/queries/useQuestions";
import QuestionList from "./QuestionList";

interface QuestionSelectionSectionProps {
  questionId: number;
  questionTitle: string;
}

// TODO: 컴포넌트 분리
const QuestionSelectionSection = ({ questionId, questionTitle }: QuestionSelectionSectionProps) => {
  const { setInterviewOption, interviewOption } = useInterviewOption();
  const { data: questionList, isLoading } = useGetQuestions({ interviewId: questionId });

  const selectAllQuestions = () => {
    if (!questionList) return;

    setInterviewOption((prev) => {
      const prevQuestionIds = prev.questions.map((question) => question.questionId);
      if (questionList.every((question) => prevQuestionIds.includes(question.questionId))) {
        return {
          ...prev,
          questions: prev.questions.filter(
            (prevQuestion) =>
              !questionList
                .map((question) => question.questionId)
                .includes(prevQuestion.questionId),
          ),
        };
      }

      return {
        ...prev,
        questions: [...prev.questions, ...questionList],
      };
    });
  };

  const selectQuestion = (id: number) => {
    setInterviewOption((prev) => {
      const prevQuestionIds = prev.questions.map((question) => question.questionId);
      if (prevQuestionIds.includes(id)) {
        return {
          ...prev,
          questions: prev.questions.filter((question) => question.questionId !== id),
        };
      }
      const newQuestion = questionList.find((question) => question.questionId === id);
      if (!newQuestion) return prev;
      return {
        ...prev,
        questions: [...prev.questions, newQuestion],
      };
    });
  };

  // TODO: 로딩 컴포넌트
  if (isLoading) return <div>Loading...</div>;

  // TODO: header부분을 QuestionList와 추상화 레벨 맞추면 좋을 듯
  return (
    <div className="flex-col w-full ml-2">
      <div className="rounded-md border w-full h-96 overflow-y-auto">
        <header className="px-4 py-3 flex flex-row items-center border-b transition-colors hover:bg-muted/50">
          <input
            className="cursor-pointer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            type="checkbox"
            onChange={selectAllQuestions}
            checked={questionList?.every((question) =>
              interviewOption.questions.includes(question),
            )}
            id="all"
            value="all"
          />
          <label htmlFor="all" className="ml-12 text-gray-500 cursor-pointer">
            {questionTitle}
          </label>
        </header>
        <QuestionList
          questionId={questionId}
          onSelect={selectQuestion}
          interviewOption={interviewOption}
        />
      </div>
    </div>
  );
};

export default QuestionSelectionSection;

import { useInterviewOption } from "../../../../../_lib/contexts/InterviewOptionContext";
import { useGetQuestionsQuery } from "../../../_lib/queries/useQuestions";
import QuestionList from "./QuestionList";
import QuestionListHeader from "./QuestionListHeader";

interface QuestionSelectionSectionProps {
  workbookId: number | null;
  questionTitle: string;
}

// TODO: 컴포넌트 분리 -> SelectForm 등의 공용 컴포넌트로 분리하면 좋을 것 같다.
// 또는 훅으로 분리해도 좋을듯
const QuestionSelectionSection = ({ workbookId, questionTitle }: QuestionSelectionSectionProps) => {
  const { setInterviewOption, interviewOption } = useInterviewOption();
  const { data: questions, isLoading } = useGetQuestionsQuery({ workbookId: workbookId || 0 });

  const getPrevQuestionIds = () => interviewOption.questions.map((question) => question.questionId);
  const selectAllQuestions = () => {
    if (!questions) return;
    setInterviewOption((prev) => {
      const prevQuestionIds = interviewOption.questions.map((question) => question.questionId);
      if (questions.every((question) => prevQuestionIds.includes(question.questionId))) {
        return {
          ...prev,
          questions: prev.questions.filter(
            (prevQuestion) =>
              !questions.map((question) => question.questionId).includes(prevQuestion.questionId),
          ),
        };
      }

      return {
        ...prev,
        questions: [...prev.questions, ...questions],
      };
    });
  };

  const selectQuestion = (id: number) => {
    if (!questions) return;
    setInterviewOption((prev) => {
      const prevQuestionIds = getPrevQuestionIds();
      if (prevQuestionIds.includes(id)) {
        return {
          ...prev,
          questions: prev.questions.filter((question) => question.questionId !== id),
        };
      }
      const newQuestion = questions.find((question) => question.questionId === id);
      if (!newQuestion) return prev;
      return {
        ...prev,
        questions: [...prev.questions, newQuestion],
      };
    });
  };

  // TODO: 로딩 컴포넌트 구현
  if (isLoading) return <div>Loading...</div>;

  // TODO: header부분을 QuestionList와 추상화 레벨 맞추면 좋을 것 같다.
  return (
    <div className="flex-col w-full ml-2">
      <div className="rounded-md border w-full h-96 overflow-y-auto">
        <QuestionListHeader
          questions={questions}
          questionTitle={workbookId ? questionTitle : "질문 세트가 없어요."}
          onSelect={selectAllQuestions}
          workbookId={workbookId}
        />
        {workbookId && (
          <QuestionList
            workbookId={workbookId}
            interviewOption={interviewOption}
            onSelect={selectQuestion}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionSelectionSection;

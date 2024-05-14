import { useInterviewOption } from "../../../../../_lib/contexts/InterviewOptionContext";
import { useGetQuestionsQuery } from "../../../_lib/queries/useQuestions";
import QuestionList from "./QuestionList";
import QuestionListHeader from "./QuestionListHeader";

interface QuestionSelectionSectionProps {
  questionId: number;
  questionTitle: string;
}

// TODO: 컴포넌트 분리 -> SelectForm 등의 공용 컴포넌트로 분리하면 좋을 것 같다.
// 또는 훅으로 분리해도 좋을듯
const QuestionSelectionSection = ({ questionId, questionTitle }: QuestionSelectionSectionProps) => {
  const { setInterviewOption, interviewOption } = useInterviewOption();
  const { data: questionList, isLoading } = useGetQuestionsQuery({ interviewId: questionId });

  const getPrevQuestionIds = () => interviewOption.questions.map((question) => question.questionId);
  const selectAllQuestions = () => {
    if (!questionList) return;
    setInterviewOption((prev) => {
      const prevQuestionIds = interviewOption.questions.map((question) => question.questionId);
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
    if (!questionList) return;
    setInterviewOption((prev) => {
      const prevQuestionIds = getPrevQuestionIds();
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

  // TODO: 로딩 컴포넌트 구현
  if (isLoading) return <div>Loading...</div>;

  // TODO: header부분을 QuestionList와 추상화 레벨 맞추면 좋을 것 같다.
  return (
    <div className="flex-col w-full ml-2">
      <div className="rounded-md border w-full h-96 overflow-y-auto">
        <QuestionListHeader
          questionList={questionList}
          questionTitle={questionTitle}
          onSelect={selectAllQuestions}
        />
        <QuestionList
          questionId={questionId}
          interviewOption={interviewOption}
          onSelect={selectQuestion}
        />
      </div>
    </div>
  );
};

export default QuestionSelectionSection;

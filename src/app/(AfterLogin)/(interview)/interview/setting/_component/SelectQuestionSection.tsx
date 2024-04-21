import { Button } from "@/components/ui/button";
import { AiOutlineSearch } from "react-icons/ai";
import { useInterviewOption } from "../../../_lib/contexts/InterviewOptionContext";
import { useStep } from "../../../_lib/contexts/StepContext";
import useGetQuestions from "../_lib/queries/useGetQuestions";

interface QuestionSelectionSectionProps {
  questionId: number;
  questionTitle: string;
}

const QuestionSelectionSection = ({ questionId, questionTitle }: QuestionSelectionSectionProps) => {
  const { setInterviewOption, interviewOption } = useInterviewOption();
  const { handleNextStep, handlePrevStep } = useStep();
  const { data: questionList, isLoading } = useGetQuestions({ interviewId: questionId });

  const selectAllQuestions = () => {
    if (!questionList) return;

    setInterviewOption((prev) => {
      if (questionList.every((question) => prev.questions.includes(question.questionId))) {
        return {
          ...prev,
          questions: prev.questions.filter(
            (prevQuestion) =>
              !questionList.map((question) => question.questionId).includes(prevQuestion),
          ),
        };
      }
      return { ...prev, questions: questionList.map((question) => question.questionId) };
    });
  };

  const selectQuestion = (id: number) => {
    setInterviewOption((prev) => {
      if (prev.questions.includes(id)) {
        return { ...prev, questions: prev.questions.filter((question) => question !== id) };
      }
      return { ...prev, questions: [...prev.questions, id] };
    });
  };

  // TODO: 로딩 컴포넌트
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex-col w-full ml-2">
      <div className="rounded-md border w-full h-96 overflow-y-auto">
        <header className="px-4 py-3 flex flex-row items-center border-b transition-colors hover:bg-muted/50">
          <input
            className="cursor-pointer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            type="checkbox"
            onChange={selectAllQuestions}
            checked={questionList?.every((question) =>
              interviewOption.questions.includes(question.questionId),
            )}
            value="all"
          />
          <label className="ml-12 text-gray-500 cursor-pointer">{questionTitle}</label>
        </header>
        <ul>
          {questionList?.map((question) => (
            <QuestionItem
              key={question.questionId}
              id={question.questionId}
              content={question.questionContent}
              onSelect={selectQuestion}
              checked={interviewOption.questions.includes(question.questionId)}
            />
          ))}
        </ul>
      </div>
      <footer className="flex justify-between mt-4">
        <span className="text-gray-500 text-sm">0 of 13 row(s) selected.</span>
        <Button className="ml-auto" disabled variant="outline" onClick={() => handlePrevStep()}>
          이전
        </Button>
        <Button className="ml-2" variant="outline" onClick={() => handleNextStep()}>
          다음
        </Button>
      </footer>
    </div>
  );
};

interface QuestionItemProps {
  id: number;
  content: string;
  checked: boolean;
  onSelect: (id: number) => void;
}

const QuestionItem = ({ id, content, onSelect, checked }: QuestionItemProps) => {
  return (
    <li className="px-4 py-4 flex items-center border-b transition-colors hover:bg-muted/50 group">
      <input
        id={id.toString()}
        className="cursor-pointer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        type="checkbox"
        checked={checked}
        onChange={() => onSelect(id)}
        value={id}
      />
      <label htmlFor={id.toString()} className="ml-12 cursor-pointer">
        {content}
      </label>
      <AiOutlineSearch className="ml-auto cursor-pointer opacity-0 group-hover:opacity-100" />
    </li>
  );
};

export default QuestionSelectionSection;

import { useInterviewOption } from "@/app/(AfterLogin)/(interview)/_lib/contexts/InterviewOptionContext";
import { ResponseQuestions } from "../../../_lib/queries/useQuestions";

interface SelectQuestionHeaderProps {
  questionList: ResponseQuestions | undefined;
  questionTitle: string;
  onSelect: () => void;
}

const QuestionListHeader = ({
  questionList = [],
  questionTitle,
  onSelect,
}: SelectQuestionHeaderProps) => {
  const { interviewOption, setInterviewOption } = useInterviewOption();

  return (
    <header className="px-4 py-3 flex flex-row items-center border-b transition-colors hover:bg-muted/50">
      <input
        className="cursor-pointer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        type="checkbox"
        onChange={onSelect}
        checked={questionList?.every((question) => interviewOption.questions.includes(question))}
        id="all"
        value="all"
      />
      <label htmlFor="all" className="ml-12 text-gray-500 cursor-pointer">
        {questionTitle}
      </label>
    </header>
  );
};

export default QuestionListHeader;

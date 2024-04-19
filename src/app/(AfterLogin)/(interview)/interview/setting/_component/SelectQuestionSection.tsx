import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useInterviewOption } from "../../../_lib/contexts/InterviewOptionContext";

interface QuestionSelectionSectionProps {
  setStep: (step: number) => void;
  questionId: number;
  questionTitle: string;
}

const questionList = [
  {
    questionId: 1,
    questionContent: "질문내용입니다.1",
    answerId: 1,
    answerContent: "답변내용입니다.1",
  },
  {
    questionId: 2,
    questionContent: "질문내용입니다.2",
    answerId: 2,
    answerContent: "답변내용입니다.2",
  },
  {
    questionId: 3,
    questionContent: "질문내용입니다.3",
    answerId: 3,
    answerContent: "답변내용입니다.3",
  },
  {
    questionId: 4,
    questionContent: "질문내용입니다.4",
    answerId: 4,
    answerContent: "답변내용입니다.4",
  },
  {
    questionId: 5,
    questionContent: "질문내용입니다.5",
    answerId: 5,
    answerContent: "답변내용입니다.5",
  },
  {
    questionId: 6,
    questionContent: "질문내용입니다.6",
    answerId: 6,
    answerContent: "답변내용입니다.6",
  },
  {
    questionId: 7,
    questionContent: "질문내용입니다.7",
    answerId: 7,
    answerContent: "답변내용입니다.7",
  },
  {
    questionId: 8,
    questionContent: "질문내용입니다.8",
    answerId: 8,
    answerContent: "답변내용입니다.8",
  },
  {
    questionId: 9,
    questionContent: "질문내용입니다.9",
    answerId: 9,
    answerContent: "답변내용입니다.9",
  },
  {
    questionId: 10,
    questionContent: "질문내용입니다.10",
    answerId: 10,
    answerContent: "답변내용입니다.10",
  },
  {
    questionId: 11,
    questionContent: "질문내용입니다.11",
    answerId: 11,
    answerContent: "답변내용입니다.11",
  },
  {
    questionId: 12,
    questionContent: "질문내용입니다.12",
    answerId: 12,
    answerContent: "답변내용입니다.12",
  },
  {
    questionId: 13,
    questionContent: "질문내용입니다.13",
    answerId: 13,
  },
];

const QuestionSelectionSection = ({
  setStep,
  questionId,
  questionTitle,
}: QuestionSelectionSectionProps) => {
  const { setInterviewOption, interviewOption } = useInterviewOption();

  const selectAllQuestions = () => {
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

  return (
    <div className="flex-col w-full ml-2">
      <div className="rounded-md border w-full h-96 overflow-y-auto">
        <header className="px-4 py-3 flex flex-row items-center border-b transition-colors hover:bg-muted/50">
          <input
            className="cursor-pointer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            type="checkbox"
            onChange={selectAllQuestions}
            checked={questionList.every((question) =>
              interviewOption.questions.includes(question.questionId),
            )}
          />
          <label className="ml-12 text-gray-500 cursor-pointer">{questionTitle}</label>
        </header>
        <ul>
          {questionList.map((question) => (
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
        <Button className="ml-auto" disabled variant="outline" onClick={() => setStep(1)}>
          이전
        </Button>
        <Button
          className="ml-2"
          variant="outline"
          onClick={() => {
            setStep(2);
          }}
        >
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
      />
      <label htmlFor={id.toString()} className="ml-12 cursor-pointer">
        {content}
      </label>
      <AiOutlineSearch className="ml-auto cursor-pointer opacity-0 group-hover:opacity-100" />
    </li>
  );
};

export default QuestionSelectionSection;

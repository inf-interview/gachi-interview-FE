"use client";

import { useState } from "react";
import SelectQuestionSection from "./SelectQuestionSection";

interface QuestionPickProps {
  setStep: (step: number) => void;
}

const questionList = [
  {
    listId: 1,
    question: "이것만 알면 FE면접 끝!",
  },
  {
    listId: 2,
    question: "이것만 알면 BE면접 끝!",
  },
  {
    listId: 3,
    question: "이것만 알면 FullStack면접 끝!",
  },
];

const QuestionPick = ({ setStep }: QuestionPickProps) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(questionList[0].listId);

  return (
    <div className="flex h-dvh w-full flex-col sm:flex-row">
      <ul>
        {questionList.map((question) => (
          <li
            key={question.listId}
            className={`${
              selectedQuestionId === question.listId && "bg-muted justify-start"
            } flex-col items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 justify-start cursor-pointer`}
            onClick={() => setSelectedQuestionId(question.listId)}
          >
            {question.question}
          </li>
        ))}
      </ul>
      <SelectQuestionSection
        setStep={setStep}
        questionId={selectedQuestionId}
        questionTitle={
          questionList.find((question) => question.listId === selectedQuestionId)?.question || ""
        }
      />
    </div>
  );
};

export default QuestionPick;

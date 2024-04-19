"use client";

import { Dispatch, SetStateAction, useState } from "react";
import SelectQuestionSection from "./SelectQuestionSection";
import { InterviewOptionType } from "../page";

interface QuestionPickProps {
  setStep: (step: number) => void;
  setInterviewOption: Dispatch<SetStateAction<InterviewOptionType>>;
  interviewOption: InterviewOptionType;
}

const questionSetList = [
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

const QuestionPick = ({ setStep, setInterviewOption, interviewOption }: QuestionPickProps) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(questionSetList[0].listId);

  return (
    <div className="flex flex-col sm:flex-row">
      <ul>
        {questionSetList.map((question) => (
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
        setInterviewOption={setInterviewOption}
        interviewOption={interviewOption}
        questionId={selectedQuestionId}
        questionTitle={
          questionSetList.find((question) => question.listId === selectedQuestionId)?.question || ""
        }
      />
    </div>
  );
};

export default QuestionPick;

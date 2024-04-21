"use client";

import { useState } from "react";
import SelectQuestionSection from "./SelectQuestionSection";
import useGetQuestionList from "../_lib/queries/useGetQuestionList";

const QuestionPick = () => {
  const { data: questionList } = useGetQuestionList();
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(
    questionList?.[0]?.listId || 1,
  );

  // TODO: Loading 컴포넌트 추가
  if (!questionList) return null;

  return (
    <div className="flex flex-col sm:flex-row">
      <ul>
        {questionList.map((question) => (
          <li
            key={question.listId}
            className={`${
              selectedQuestionId === question.listId && "bg-muted justify-start"
            } flex-col items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 justify-start cursor-pointer`}
            onClick={() => setSelectedQuestionId(question.listId)}
          >
            {question.title}
          </li>
        ))}
      </ul>
      <SelectQuestionSection
        questionId={selectedQuestionId}
        questionTitle={
          questionList.find((question) => question.listId === selectedQuestionId)?.title || ""
        }
      />
    </div>
  );
};

export default QuestionPick;

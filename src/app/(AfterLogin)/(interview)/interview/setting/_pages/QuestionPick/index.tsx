"use client";

import { useEffect, useState } from "react";
import SelectQuestionSection from "./_component/SelectQuestionSection";
import { useGetQuestionListQuery } from "../../_lib/queries/useQuestionList";
import SelectTitleSection from "./_component/SelectTitleSection";

const QuestionPick = () => {
  const { data: questionList } = useGetQuestionListQuery();
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    questionList?.[0]?.listId || null,
  );

  useEffect(() => {
    if (questionList?.[0]?.listId) setSelectedQuestionId(questionList[0].listId);
  }, [questionList]);

  // TODO: Loading 컴포넌트 추가
  if (!questionList) return null;

  return (
    <div className="flex flex-col sm:flex-row">
      {selectedQuestionId && (
        <>
          <SelectTitleSection
            selectedQuestionId={selectedQuestionId}
            setSelectedQuestionId={setSelectedQuestionId}
          />
          <SelectQuestionSection
            questionId={selectedQuestionId}
            questionTitle={
              questionList.find((question) => question.listId === selectedQuestionId)?.title || ""
            }
          />
        </>
      )}
    </div>
  );
};

export default QuestionPick;

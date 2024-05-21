"use client";

import { useEffect, useState } from "react";
import SelectQuestionSection from "./_component/SelectQuestionSection";
import { useGetWorkbookListQuery } from "../../_lib/queries/useWorkbookListQuery";
import SelectWorkbookSection from "./_component/SelectWorkbookSection";

const QuestionPick = () => {
  const { data: questionList } = useGetWorkbookListQuery();
  const [selectedWorkbookId, setSelectedWorkbookId] = useState<number | null>(
    questionList?.[0]?.listId || null,
  );

  useEffect(() => {
    if (questionList?.[0]?.listId) setSelectedWorkbookId(questionList[0].listId);
  }, [questionList]);

  // TODO: Loading 컴포넌트 추가
  if (!questionList) return null;

  return (
    <div className="flex flex-col sm:flex-row">
      {selectedWorkbookId && (
        <>
          <SelectWorkbookSection
            selectedWorkbookId={selectedWorkbookId}
            setSelectedWorkbookId={setSelectedWorkbookId}
          />
          <SelectQuestionSection
            workbookId={selectedWorkbookId}
            questionTitle={
              questionList.find((question) => question.listId === selectedWorkbookId)?.title || ""
            }
          />
        </>
      )}
    </div>
  );
};

export default QuestionPick;

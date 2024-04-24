"use client";

import { useState } from "react";
import SelectQuestionSection from "./_component/SelectQuestionSection";
import { useGetQuestionList, usePostQuestionList } from "../../_lib/queries/useQuestionList";
import { useModal } from "@/components/Modal/useModal";
import AddQuestionTitleModal from "./_component/AddQuestionTitleModal";

const QuestionPick = () => {
  const { data: questionList } = useGetQuestionList();
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(
    questionList?.[0]?.listId || 1,
  );
  const { mutate: createTitleMutate } = usePostQuestionList();
  const { openModal, closeModal } = useModal();

  const openTitleModalHandler = () => {
    const submitHandler = (title: string) => {
      // TODO: 사용자 userId로 제공
      createTitleMutate({ userId: 1, title });
      openModal(null);
    };

    openModal(<AddQuestionTitleModal closeModal={closeModal} onSubmit={submitHandler} />);
  };

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
        <li
          onClick={openTitleModalHandler}
          className="flex-col items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 justify-start cursor-pointer"
        >
          + 질문 세트를 추가할래요.
        </li>
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

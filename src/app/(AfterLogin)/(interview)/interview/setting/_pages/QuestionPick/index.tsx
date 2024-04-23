"use client";

import { useState } from "react";
import { useModal } from "@/components/Modal/useModal";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useGetQuestionList, usePostQuestionList } from "../../_lib/queries/useQuestionList";
import SelectQuestionSection from "./_component/SelectQuestionSection";

// TODO: 컴포넌트 분리
const QuestionPick = () => {
  const { data: questionList } = useGetQuestionList();
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(
    questionList?.[0]?.listId || 1,
  );
  const { mutate: createTitleMutate } = usePostQuestionList();

  const { openModal, closeModal } = useModal();

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
          onClick={() =>
            openModal(
              <AddQuestionTitleModal
                closeModal={closeModal}
                onSubmit={(title) => {
                  createTitleMutate({ userId: 1, title });
                  openModal(null);
                }}
              />,
            )
          }
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

interface AddQuestionTitleModalProps {
  closeModal: () => void;
  onSubmit: (title: string) => void;
}

const AddQuestionTitleModal = ({ closeModal, onSubmit }: AddQuestionTitleModalProps) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const validate = () => {
    if (title.length === 0) {
      setError("질문 세트의 제목을 입력해주세요.");
      return false;
    }
    setError("");
    return true;
  };

  const handleCreate = () => {
    if (!validate()) {
      return;
    }
    onSubmit(title);
  };

  return (
    <Modal
      header="질문 세트 추가"
      footer={
        <>
          <Button
            variant="outline"
            onClick={() => {
              closeModal();
            }}
          >
            취소
          </Button>
          <Button onClick={handleCreate}>추가</Button>
        </>
      }
    >
      <input
        type="text"
        className="w-full h-9 border border-gray-200 rounded-md px-4"
        placeholder="질문 세트의 제목을 입력해주세요."
        value={title}
        onChange={handleTitle}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </Modal>
  );
};

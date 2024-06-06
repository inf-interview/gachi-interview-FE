import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddQuestionTitleModalProps {
  closeModal: () => void;
  onSubmit: (title: string) => void;
  disableBackdropClick?: boolean;
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

    if (title.length > 50) {
      setError("질문 세트의 제목은 50자 이내로 입력해주세요.");
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <Modal
      disableBackdropClick={true}
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
        onKeyDown={handleKeyPress}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </Modal>
  );
};

export default AddQuestionTitleModal;

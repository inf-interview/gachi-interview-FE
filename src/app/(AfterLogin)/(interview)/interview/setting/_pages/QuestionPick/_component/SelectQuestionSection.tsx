import { Button } from "@/components/ui/button";
import { AiOutlineSearch } from "react-icons/ai";
import { useInterviewOption } from "../../../../../_lib/contexts/InterviewOptionContext";
import { useStep } from "../../../../../_lib/contexts/StepContext";
import { useGetQuestions, usePostQuestions } from "../../../_lib/queries/useQuestions";
import { useModal } from "@/components/Modal/useModal";
import { useState } from "react";
import Modal from "@/components/Modal";

// TODO: 타입 분리
interface QuestionSelectionSectionProps {
  questionId: number;
  questionTitle: string;
}

// TODO: 컴포넌트 분리
const QuestionSelectionSection = ({ questionId, questionTitle }: QuestionSelectionSectionProps) => {
  const { setInterviewOption, interviewOption } = useInterviewOption();
  const { handleNextStep, handlePrevStep } = useStep();
  const { data: questionList, isLoading } = useGetQuestions({ interviewId: questionId });
  const { openModal, closeModal } = useModal();
  const { mutate } = usePostQuestions();

  const selectAllQuestions = () => {
    if (!questionList) return;

    setInterviewOption((prev) => {
      const prevQuestionIds = prev.questions.map((question) => question.questionId);
      if (questionList.every((question) => prevQuestionIds.includes(question.questionId))) {
        return {
          ...prev,
          questions: prev.questions.filter(
            (prevQuestion) =>
              !questionList
                .map((question) => question.questionId)
                .includes(prevQuestion.questionId),
          ),
        };
      }

      return {
        ...prev,
        questions: [...prev.questions, ...questionList],
      };
    });
  };

  const selectQuestion = (id: number) => {
    setInterviewOption((prev) => {
      const prevQuestionIds = prev.questions.map((question) => question.questionId);
      if (prevQuestionIds.includes(id)) {
        return {
          ...prev,
          questions: prev.questions.filter((question) => question.questionId !== id),
        };
      }
      const newQuestion = questionList.find((question) => question.questionId === id);
      if (!newQuestion) return prev;
      return {
        ...prev,
        questions: [...prev.questions, newQuestion],
      };
    });
  };

  // TODO: 로딩 컴포넌트
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex-col w-full ml-2">
      <div className="rounded-md border w-full h-96 overflow-y-auto">
        <header className="px-4 py-3 flex flex-row items-center border-b transition-colors hover:bg-muted/50">
          <input
            className="cursor-pointer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            type="checkbox"
            onChange={selectAllQuestions}
            checked={questionList?.every((question) =>
              interviewOption.questions.includes(question),
            )}
            value="all"
          />
          <label className="ml-12 text-gray-500 cursor-pointer">{questionTitle}</label>
        </header>
        <ul>
          {questionList?.map((question) => (
            <QuestionItem
              key={question.questionId}
              id={question.questionId}
              content={question.questionContent}
              answer={question.answerContent}
              onSelect={selectQuestion}
              checked={interviewOption.questions.includes(question)}
            />
          ))}
          <li className="px-4 py-4 flex flex-col items-center justify-center border-b transition-colors hover:bg-muted/50 group">
            {questionList?.length === 0 && (
              <label className="text-gray-500">
                등록된 질문이 없습니다. 버튼을 눌러 추가해주세요.
              </label>
            )}
            <Button
              variant="outline"
              onClick={() =>
                openModal(
                  <AddQuestionModal
                    closeModal={closeModal}
                    // TODO: 인라인 함수 제거
                    onSubmit={(questionContent, answerContent) => {
                      mutate({
                        // TODO: userId 수정
                        userId: 1,
                        questionContent,
                        answerContent,
                        listId: questionId,
                      });
                      closeModal();
                    }}
                  />,
                )
              }
            >
              질문 & 답변 추가.
            </Button>
          </li>
        </ul>
      </div>
      <footer className="flex justify-between mt-4">
        <span className="text-gray-500 text-sm">
          {interviewOption.questions.length} of {questionList?.length} row(s) selected.
        </span>

        <Button className="ml-auto" disabled variant="outline" onClick={() => handlePrevStep()}>
          이전
        </Button>
        <Button className="ml-2" variant="outline" onClick={() => handleNextStep()}>
          다음
        </Button>
      </footer>
    </div>
  );
};

interface QuestionItemProps {
  id: number;
  content: string;
  answer: string;
  checked: boolean;
  onSelect: (id: number) => void;
}

const QuestionItem = ({ id, content, answer, onSelect, checked }: QuestionItemProps) => {
  const { openModal } = useModal();

  const handleSearch = () => {
    openModal(
      <Modal header="질문 상세" footer={null}>
        <div className="flex flex-col">
          <label className="text-gray-500">Q.</label>
          <p className="text-gray-700">{content}</p>
          <label className="text-gray-500 mt-4">A.</label>
          <p className="text-gray-700">{answer}</p>
        </div>
      </Modal>,
    );
  };

  return (
    <li className="px-4 py-4 flex items-center border-b transition-colors hover:bg-muted/50 group">
      <input
        id={id.toString()}
        className="cursor-pointer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        type="checkbox"
        checked={checked}
        onChange={() => onSelect(id)}
        value={id}
      />
      <label htmlFor={id.toString()} className="ml-12 cursor-pointer">
        {content}
      </label>
      <AiOutlineSearch
        onClick={handleSearch}
        className="ml-auto cursor-pointer opacity-0 group-hover:opacity-100"
      />
    </li>
  );
};

export default QuestionSelectionSection;

interface AddQuestionModalProps {
  closeModal: () => void;
  onSubmit: (question: string, answer: string) => void;
}

const AddQuestionModal = ({ closeModal, onSubmit }: AddQuestionModalProps) => {
  const [questionContent, setContent] = useState("");
  const [answerContent, setAnswer] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (questionContent === "") {
      setError("질문은 필수입니다.");
      return false;
    }
    return true;
  };

  const handleCreate = () => {
    if (!validate()) return;
    onSubmit(questionContent, answerContent);
    closeModal();
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  return (
    <Modal
      header="질문 & 답변 추가"
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
        value={questionContent}
        onChange={handleTitle}
        placeholder="질문을 입력해주세요."
        className="w-full p-2 border border-gray-300 rounded-md mt-4"
        required
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <textarea
        placeholder="예시 답변을 입력해주세요."
        value={answerContent}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mt-4 h-80"
      />
    </Modal>
  );
};

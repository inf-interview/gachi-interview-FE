import { useModal } from "@/components/Modal/useModal";
import {
  useGetQuestionListQuery,
  usePostQuestionListMutation,
} from "../../../_lib/queries/useQuestionList";
import AddQuestionTitleModal from "./AddQuestionTitleModal";

interface SelectTitleSectionProps {
  selectedQuestionId: number;
  setSelectedQuestionId: (id: number) => void;
}

const SelectTitleSection = ({
  selectedQuestionId,
  setSelectedQuestionId,
}: SelectTitleSectionProps) => {
  const { data: questionList } = useGetQuestionListQuery();

  const { mutate: createTitleMutate } = usePostQuestionListMutation();
  const { openModal, closeModal } = useModal();

  const openAddTitleModalHandler = () => {
    const submitHandler = (title: string) => {
      // TODO: 사용자 userId로 제공
      createTitleMutate({ userId: 1, title });
      closeModal();
    };

    openModal(<AddQuestionTitleModal closeModal={closeModal} onSubmit={submitHandler} />);
  };

  return (
    <ul>
      {questionList &&
        questionList.map((question) => (
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
        onClick={openAddTitleModalHandler}
        className="flex-col items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 justify-start cursor-pointer"
      >
        + 질문 세트를 추가할래요.
      </li>
    </ul>
  );
};

export default SelectTitleSection;

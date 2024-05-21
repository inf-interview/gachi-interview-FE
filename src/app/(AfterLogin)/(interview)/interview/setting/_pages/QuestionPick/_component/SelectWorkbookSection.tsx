import { useModal } from "@/components/Modal/useModal";
import {
  useGetWorkbookListQuery,
  usePostWorkbookMutation,
} from "../../../_lib/queries/useWorkbookListQuery";
import AddQuestionTitleModal from "./AddQuestionTitleModal";

interface SelectWorkbookSectionProps {
  selectedWorkbookId: number;
  setSelectedWorkbookId: (id: number) => void;
}

const SelectWorkbookSection = ({
  selectedWorkbookId,
  setSelectedWorkbookId,
}: SelectWorkbookSectionProps) => {
  const { data: questionList } = useGetWorkbookListQuery();

  const { mutate: createTitleMutate } = usePostWorkbookMutation();
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
              selectedWorkbookId === question.listId && "bg-muted justify-start"
            } flex-col items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 justify-start cursor-pointer`}
            onClick={() => setSelectedWorkbookId(question.listId)}
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

export default SelectWorkbookSection;

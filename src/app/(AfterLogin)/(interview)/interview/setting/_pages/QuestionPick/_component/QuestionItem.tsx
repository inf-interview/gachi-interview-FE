import Modal from "@/components/Modal";
import { useModal } from "@/components/Modal/useModal";
import { AiOutlineSearch } from "react-icons/ai";

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

export default QuestionItem;

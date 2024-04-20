interface QuestionListViewerProps {
  questionList: {
    questionId: number;
    questionContent: string;
    answerId: number;
    answerContent: string;
  }[];
  currentQuestionId: number;
}

const QuestionViewer = ({ questionList, currentQuestionId }: QuestionListViewerProps) => {
  return (
    <p className="absolute top-0 m-4 right-0 bg-black bg-opacity-50 p-4 rounded-lg text-white text-lg z-10 scale-x-[-1]">
      Q.{" "}
      {questionList.find((question) => question.questionId === currentQuestionId)?.questionContent}
    </p>
  );
};

export default QuestionViewer;

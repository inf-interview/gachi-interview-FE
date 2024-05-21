import axios from "axios";

interface postQuestionProps {
  userId: number;
  questionContent: string;
  answerContent: string;
  workbookId: number;
}

const postQuestion = async ({
  userId,
  questionContent,
  answerContent,
  workbookId,
}: postQuestionProps) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/workbook/${workbookId}/question`,
      {
        userId,
        questionContent,
        answerContent,
      },
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default postQuestion;

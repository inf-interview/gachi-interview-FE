import axios from "axios";

interface postQuestionListProps {
  userId: number;
  title: string;
}

const postQuestionList = async ({ userId, title }: postQuestionListProps) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/interview/question`, {
      userId,
      title,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default postQuestionList;

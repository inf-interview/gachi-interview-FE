import axios from "axios";

interface getQuestionsProps {
  interviewId: number;
}

const getQuestions = async ({ interviewId }: getQuestionsProps) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/interview/question/${interviewId}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default getQuestions;

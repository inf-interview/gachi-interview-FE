import { useQuery } from "@tanstack/react-query";
import getQuestions from "../api/getQuestions";

// TODO: 타입 디렉토리로 분리

type ResponseQuestions = {
  questionId: number;
  questionContent: string;
  answerContent: string;
  answerId: number;
}[];

const useGetQuestions = ({ interviewId }: { interviewId: number }) => {
  return useQuery<ResponseQuestions, Error>({
    queryKey: ["questionList", interviewId],
    queryFn: () => getQuestions({ interviewId }),
  });
};

export default useGetQuestions;

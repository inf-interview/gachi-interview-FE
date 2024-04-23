import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getQuestions from "../api/getQuestions";
import postQuestion from "../api/postQuestion";

// TODO: 타입 디렉토리로 분리

type ResponseQuestions = {
  questionId: number;
  questionContent: string;
  answerContent: string;
  answerId: number;
}[];

export const useGetQuestions = ({ interviewId }: { interviewId: number }) => {
  return useQuery<ResponseQuestions, Error>({
    queryKey: ["questionList", interviewId],
    queryFn: () => getQuestions({ interviewId }),
    initialData: [],
  });
};

type RequestPostQuestions = {
  userId: number;
  questionContent: string;
  answerContent: string;
  listId: number;
};

export const usePostQuestions = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseQuestions, Error, RequestPostQuestions>({
    mutationKey: ["questionList"],
    mutationFn: (data) => postQuestion(data),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["questionList"],
      });
    },
  });
};

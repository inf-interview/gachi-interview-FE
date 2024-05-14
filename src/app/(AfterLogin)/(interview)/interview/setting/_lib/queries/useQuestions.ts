import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getQuestions from "../api/getQuestions";
import postQuestion from "../api/postQuestion";

// TODO: 타입 디렉토리로 분리

export type ResponseQuestions = {
  questionId: number;
  questionContent: string;
  answerContent: string;
  answerId: number;
}[];

export const useGetQuestionsQuery = ({ interviewId }: { interviewId: number }) => {
  const queryClient = useQueryClient();
  return useQuery<ResponseQuestions, Error>({
    queryKey: ["questionList", interviewId],
    queryFn: () => getQuestions({ interviewId }),
    initialData: () => {
      const cache = queryClient.getQueryData<ResponseQuestions>(["questionList", interviewId]);
      return cache;
    },
    placeholderData: [],
    gcTime: 300 * 1000,
    staleTime: 300 * 1000,
  });
};

type RequestPostQuestions = {
  userId: number;
  questionContent: string;
  answerContent: string;
  listId: number;
};

export const usePostQuestionsMutation = () => {
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

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getQuestionList from "../api/getQuestionList";
import postQuestionList from "../api/postQuestionList";

type ResponseQuestionList = {
  listId: number;
  title: string;
}[];

export const useGetQuestionList = () => {
  const queryClient = useQueryClient();

  return useQuery<ResponseQuestionList, Error>({
    queryKey: ["questionList"],
    queryFn: getQuestionList,
    initialData: () => {
      const cache = queryClient.getQueryData<ResponseQuestionList>(["questionList"]);
      return cache;
    },
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });
};

export const usePostQuestionList = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseQuestionList, Error, { userId: number; title: string }>({
    mutationKey: ["questionList"],
    mutationFn: (data) => postQuestionList(data),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["questionList"],
      });
    },
  });
};

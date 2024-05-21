import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getWorkbookList from "../api/getWorkbookList";
import postWorkbook from "../api/postWorkbook";

type ResponseWorkbookList = {
  listId: number;
  title: string;
}[];

export const useGetWorkbookListQuery = () => {
  const queryClient = useQueryClient();
  return useQuery<ResponseWorkbookList, Error>({
    queryKey: ["workbookList"],
    queryFn: getWorkbookList,
    initialData: () => {
      const cache = queryClient.getQueryData<ResponseWorkbookList>(["workbookList"]);
      return cache;
    },
    staleTime: 300 * 1000,
    gcTime: 300 * 1000,
  });
};

export const usePostWorkbookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseWorkbookList, Error, { userId: number; title: string }>({
    mutationKey: ["workbookList"],
    mutationFn: (data) => postWorkbook(data),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["workbookList"],
      });
    },
  });
};

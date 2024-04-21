import { useQuery } from "@tanstack/react-query";
import getQuestionList from "../api/getQuestionList";

type ResponseQuestionList = {
  listId: number;
  title: string;
}[];

const useGetQuestionList = () => {
  return useQuery<ResponseQuestionList, Error>({
    queryKey: ["questionList"],
    queryFn: getQuestionList,
  });
};

export default useGetQuestionList;

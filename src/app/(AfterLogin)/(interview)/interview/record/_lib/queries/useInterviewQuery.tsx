import { useMutation } from "@tanstack/react-query";
import postInterview, { postInterviewProps as RequestPostInterview } from "../api/postInterview";

type ResponsePostInterview = {
  videoId: number;
};

export const usePostInterviewMutation = () => {
  return useMutation<ResponsePostInterview, Error, RequestPostInterview>({
    mutationKey: ["interview"],
    mutationFn: (data) => postInterview(data),
  });
};

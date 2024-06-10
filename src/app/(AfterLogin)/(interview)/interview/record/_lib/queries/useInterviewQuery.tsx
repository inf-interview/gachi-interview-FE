import { useMutation } from "@tanstack/react-query";
import postInterview, { postInterviewProps as RequestPostInterview } from "../api/postInterview";

interface Response {
  videoId: number;
}

export const usePostInterviewMutation = () => {
  return useMutation<Response, Error, RequestPostInterview>({
    mutationKey: ["interview"],
    mutationFn: (data) => postInterview(data),
  });
};

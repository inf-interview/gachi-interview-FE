import { useMutation } from "@tanstack/react-query";
import postFeedback, { PostFeedbackRequest } from "../api/postFeedback";

export const usePostFeedbackMutation = () => {
  return useMutation<Response, Error, PostFeedbackRequest>({
    mutationKey: ["feedback"],
    mutationFn: (data) => postFeedback(data),
  });
};

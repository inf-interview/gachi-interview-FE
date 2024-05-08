import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getComments from "../api/getComments";
import postComment, { postCommentProps as RequestPostComment } from "../api/postComment";
import patchComment, { PatchCommentProps as RequestPatchComment } from "../api/patchComment";
import deleteComment, { DeleteCommentProps as RequestDeleteComment } from "../api/deleteComment";

type ResponseGetComments = {
  commentId: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: string;
}[];

export const useGetCommentsQuery = (videoId: string) => {
  return useQuery<ResponseGetComments, Error, ResponseGetComments, [string, string, string]>({
    queryKey: ["interview", "comments", videoId],
    queryFn: () => getComments(videoId),
  });
};

type ResponsePostComment = {
  commentId: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: string;
};

export const usePostCommentMutation = (videoId: string) => {
  const queryClient = useQueryClient();
  return useMutation<ResponsePostComment, Error, RequestPostComment>({
    mutationKey: ["interview", "comments", videoId],
    mutationFn: (data) => postComment(data),
    onMutate: async (data) => {
      const previousData = queryClient.getQueryData(["interview", "comments", data.videoId]);
      queryClient.setQueryData(
        ["interview", "comments", data.videoId],
        (old: ResponseGetComments) => {
          return [
            ...old,
            {
              commentId: Math.random(),
              userId: data.userId,
              userName: "같이 면접",
              content: data.content,
              createdAt: new Date().toISOString(),
            },
          ];
        },
      );
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interview", "comments", videoId],
      });
    },
  });
};

export const useUpdateCommentMutation = (videoId: string) => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, RequestPatchComment>({
    mutationKey: ["interview", "comments", videoId],
    mutationFn: (data) => patchComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interview", "comments", videoId],
      });
    },
  });
};

export const useDeleteCommentMutation = (videoId: string) => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, RequestDeleteComment>({
    mutationKey: ["interview", "comments", videoId],
    mutationFn: (data) => deleteComment(data),
    onMutate: async (data) => {
      const previousData = queryClient.getQueryData(["interview", "comments", data.videoId]);
      queryClient.setQueryData(
        ["interview", "comments", data.videoId],
        (old: ResponseGetComments) => {
          return old.filter((comment) => comment.commentId !== data.commentId);
        },
      );
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interview", "comments", videoId],
      });
    },
  });
};

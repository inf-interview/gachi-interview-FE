"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import postComment from "../community/_lib/postComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment } from "@/model/Comment";
import { useRecoilValue } from "recoil";
import { accessTokenState, userIdState } from "@/store/auth";

export default function CommentForm({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const accessToken = useRecoilValue(accessTokenState);
  const userId = useRecoilValue(userIdState);

  const commentData = useMutation({
    mutationKey: ["community", postId, "comments"],
    mutationFn: (newComment: {
      content: string;
      postId: string;
      userId: number;
      accessToken: string;
    }) => postComment(newComment),
    // onMutate: async (newComment) => {
    //   const previousData = queryClient.getQueryData(["community", postId, "comments"]);
    //   queryClient.setQueryData(["community", postId, "comments"], (old: Comment[]) => {
    //     return [
    //       ...old,
    //       {
    //         commentId: Math.random(),
    //         userId: newComment.userId,
    //         userName: "같이 면접",
    //         content: newComment.content,
    //         createdAt: new Date().toISOString(),
    //       },
    //     ];
    //   });
    //   return { previousData };
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community", postId, "comments"],
      });
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commentData.mutate({
      content,
      postId,
      userId,
      accessToken,
    });
    setContent("");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  return (
    <form onSubmit={onSubmit} className="bottom-1 flex p-4 border border-gray-300 rounded-md">
      <input
        type="text"
        value={content}
        onChange={onChange}
        placeholder="댓글을 작성해주세요."
        className="flex-1 w-full h-full focus:outline-none"
      />
      <Button type="submit">등록</Button>
    </form>
  );
}

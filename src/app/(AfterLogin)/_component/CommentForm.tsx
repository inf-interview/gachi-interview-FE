"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import postComment from "../community/_lib/postComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const User = {
  userId: 1,
  userName: "이승학",
  image: "/noneProfile.jpg",
};

export default function CommentForm({ postId }: { postId: number }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const commentData = useMutation({
    mutationKey: ["community", postId, "comments"],
    mutationFn: (newComment: { content: string; postId: number }) => postComment(newComment),
    onMutate: async (newComment) => {
      const previousData = queryClient.getQueryData(["community", postId, "comments"]);
      queryClient.setQueryData(["community", postId, "comments"], (old: any) => {
        return [
          ...old,
          {
            postId,
            commentId: Math.random(),
            User: User,
            content: newComment.content,
            createdAt: new Date().toISOString(),
          },
        ];
      });
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["community", postId, "comments"],
      });
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commentData.mutate({ content, postId });
    setContent("");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  return (
    <form onSubmit={onSubmit} className="bottom-1 flex w-2/3 p-4 border border-gray-300 rounded-md">
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

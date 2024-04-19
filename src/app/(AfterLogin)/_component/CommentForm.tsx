"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import postComment from "../community/_lib/postComment";

export default function CommentForm({ postId }: { postId: number }) {
  const [content, setContent] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContent("");
    const commentData = await postComment({ content, postId });
    console.log("commentData", commentData);
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

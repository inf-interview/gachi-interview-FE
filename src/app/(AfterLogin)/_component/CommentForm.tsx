"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";

export default function CommentForm() {
  const [comment, setComment] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComment("");
    console.log(comment);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  return (
    <form onSubmit={onSubmit} className="bottom-1 flex w-2/3 p-4 border border-gray-300 rounded-md">
      <input
        type="text"
        value={comment}
        onChange={onChange}
        placeholder="댓글을 작성해주세요."
        className="flex-1 w-full h-full focus:outline-none"
      />
      <Button type="submit">등록</Button>
    </form>
  );
}

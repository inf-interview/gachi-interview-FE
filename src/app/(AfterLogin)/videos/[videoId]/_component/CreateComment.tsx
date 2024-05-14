"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEvent, useState } from "react";
import { usePostCommentMutation } from "../../_lib/queries/useCommentQuery";

interface CreateCommentProps {
  videoId: string;
}

const CreateComment = ({ videoId }: CreateCommentProps) => {
  const [comment, setComment] = useState("");
  const [focus, setFocus] = useState(false);
  const { mutate } = usePostCommentMutation(videoId);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: userId 수정
    mutate({
      content: comment,
      userId: 1,
      videoId,
    });
    setComment("");
    setFocus(false);
  };

  const handleFocus = () => {
    setFocus((prev) => !prev);
  };

  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={comment}
        onChange={handleComment}
        // TODO: placeholder 수정
        placeholder="이영재님, 피드백을 작성해보세요."
        className={`w-full ${
          focus ? "h-32" : "h-14 overflow-hidden"
        } mt-4 p-4 rounded-lg border border-gray-300`}
        onFocus={handleFocus}
      />
      {focus && (
        <div className="flex justify-end mt-2 gap-2">
          <Button onClick={handleFocus}>취소</Button>
          <Button type="submit">등록</Button>
        </div>
      )}
    </form>
  );
};

export default CreateComment;

"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ReviewPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title);
    console.log(content);
    console.log(tags);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleNewTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleNewTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false && newTag.trim() !== "") {
      e.preventDefault();
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleBadgeClick = (clickedTag: string) => {
    setTags(tags.filter((tag) => tag !== clickedTag));
  };

  return (
    <>
      <p className="text-3xl font-bold mt-8">면접 후기 작성</p>
      <form onSubmit={onSubmit} className="flex flex-col w-full mt-2">
        <input
          type="text"
          placeholder="제목에 핵심 내용을 요약해 보세요."
          onChange={handleTitle}
          value={title}
          required
          className="w-2/3 p-2 border border-gray-300 rounded-md mb-4 text-lg"
        />
        <div className="mb-4">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              className="mr-1 cursor-pointer"
              onClick={() => handleBadgeClick(tag)}
            >
              #{tag}
            </Badge>
          ))}
          <input
            type="text"
            value={newTag}
            onChange={handleNewTagChange}
            onKeyDown={handleNewTagKeyDown}
            placeholder="태그를 입력하세요."
            className="w-2/3 border-none focus:outline-none"
          />
        </div>
        <textarea
          placeholder={`[면접 후기 내용 작성 가이드]\n\n - 면접 질문\n - 면접 답변 혹은 면접 느낌\n - 발표 시기`}
          onChange={handleContent}
          value={content}
          required
          className="w-2/3 p-2 border border-gray-300 rounded-md mb-4 h-80"
        />
        <button type="submit" className="w-2/3 bg-black text-white font-bold py-2 px-4 rounded">
          글쓰기
        </button>
      </form>
    </>
  );
}
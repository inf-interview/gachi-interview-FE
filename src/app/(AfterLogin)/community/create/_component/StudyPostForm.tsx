"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import postBoard from "../_lib/postBoard";
import { useSearchParams } from "next/navigation";

export default function StudyPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const category = useSearchParams().get("tab");

  if (!category) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title);
    console.log(content);
    console.log(tags);
    const postData = await postBoard({ title, content, tags, category });
    console.log("postData", postData);
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
      <p className="text-3xl font-bold mt-8">스터디 모집 글 작성</p>
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
          placeholder={`[스터디 모집 글 내용 작성 가이드]\n\n - 구체적인 스터디 내용\n - 모집 인원\n - 스터디 진행 방식`}
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

"use client";

import { useQuery } from "@tanstack/react-query";
import { Post } from "@/model/Post";
import Comment from "./Comment";
import getComments from "../community/_lib/getComments";

export default function Comments({ postId }: { postId: number }) {
  const { data: comments } = useQuery<Post[], Object, Post[], [_1: string, _2: number, _3: string]>(
    {
      queryKey: ["community", postId, "comments"],
      queryFn: getComments,
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    },
  );
  if (!comments) {
    return null;
  }
  return comments.map((comment, i) => <Comment key={i} comment={comment} />);
}

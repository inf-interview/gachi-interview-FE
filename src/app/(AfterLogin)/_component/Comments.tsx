"use client";

import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import getComments from "../community/_lib/getComments";
import { Comment as IComment } from "@/model/Comment";

export default function Comments({ postId }: { postId: string }) {
  const { data: comments } = useQuery<
    IComment[],
    Object,
    IComment[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["community", postId, "comments"],
    queryFn: ({ queryKey }) => getComments({ queryKey }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  if (!comments) {
    return null;
  }
  return comments.map((comment, i) => <Comment key={i} postId={postId} comment={comment} />);
}

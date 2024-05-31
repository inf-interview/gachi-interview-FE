import customFetcher from "@/utils/customFetcher";

export default async function patchComment({
  userId,
  commentId,
  content,
  postId,
}: {
  userId: number;
  commentId: number;
  content: string;
  postId: string;
}) {
  const { response, data } = await customFetcher(`/board/${postId}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, commentId, content }),
  });

  if (!response?.ok) {
    throw new Error("Failed to patch comment");
  }
  // return response.json();
  return await data;
}

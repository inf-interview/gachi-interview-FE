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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/board/${postId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, commentId, content }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to patch comment");
  }
  return response.json();
}

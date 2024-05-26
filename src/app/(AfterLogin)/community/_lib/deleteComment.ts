export default async function deleteComment({
  userId,
  commentId,
  postId,
}: {
  userId: number;
  commentId: number;
  postId: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/board/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, commentId }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }
  return response.json();
}

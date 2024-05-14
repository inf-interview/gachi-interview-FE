export interface DeleteCommentProps {
  userId: number;
  commentId: number;
  videoId: string;
}

const deleteComment = async ({ userId, commentId, videoId }: DeleteCommentProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/${videoId}/comments/${commentId}`,
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
};

export default deleteComment;

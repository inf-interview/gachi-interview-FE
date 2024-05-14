export interface PatchCommentProps {
  userId: number;
  commentId: number;
  content: string;
  videoId: string;
}

const patchComment = async ({ userId, commentId, content, videoId }: PatchCommentProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/${videoId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, content }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to patch comment");
  }
  return response.json();
};

export default patchComment;

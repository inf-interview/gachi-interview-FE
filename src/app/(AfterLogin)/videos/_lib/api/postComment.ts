export interface postCommentProps {
  userId: number;
  videoId: string;
  content: string;
}

const postComment = async ({ userId, videoId, content }: postCommentProps) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/video/${videoId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        content,
      }),
    });

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default postComment;

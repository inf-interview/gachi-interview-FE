export interface postLikeProps {
  userId: number;
  videoId: string;
}

const postLike = async ({ userId, videoId }: postLikeProps) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video/${videoId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        videoId,
      }),
    });

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default postLike;

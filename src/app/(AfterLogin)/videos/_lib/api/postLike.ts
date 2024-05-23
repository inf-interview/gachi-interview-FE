export interface postLikeProps {
  userId: number;
  id: string;
  type: "video" | "board";
}

const postLike = async ({ userId, id, type }: postLikeProps) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        id,
      }),
    });

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default postLike;

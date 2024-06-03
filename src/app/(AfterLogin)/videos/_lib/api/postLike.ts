import customFetcher from "@/utils/customFetcher";

export interface postLikeProps {
  userId: number;
  id: string;
  type: "video" | "board";
}

const postLike = async ({ userId, id, type }: postLikeProps) => {
  try {
    const { data } = await customFetcher(`/${type}/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        [type === "video" ? "videoId" : "postId"]: id,
      }),
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default postLike;

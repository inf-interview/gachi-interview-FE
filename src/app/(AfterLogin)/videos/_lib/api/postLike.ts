import customFetcher from "@/lib/utills/customFetcher";

export interface postLikeProps {
  userId: number;
  id: string;
  type: "video" | "board";
  accessToken: string;
}

const postLike = async ({ userId, id, type, accessToken }: postLikeProps) => {
  try {
    const { response, data } = await customFetcher(`/${type}/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        [type === "video" ? "videoId" : "postId"]: id,
      }),
    });

    if (!response?.ok) {
      throw new Error("Failed to fetch data");
    }

    return await data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default postLike;

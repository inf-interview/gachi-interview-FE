import customFetcher from "@/utils/customFetcher";

export interface postLikeProps {
  userId: number;
  postId: string;
  accessToken: string;
}

export default async function postLike({ userId, postId, accessToken }: postLikeProps) {
  console.log("postLike called");
  try {
    const { response, data } = await customFetcher(`/board/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        postId,
      }),
    });

    if (!response?.ok) {
      throw new Error("Failed to fetch data");
    }
    console.log("postLike return data", data);
    return await data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
}

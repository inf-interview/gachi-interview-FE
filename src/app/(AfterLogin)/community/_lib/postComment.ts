import customFetcher from "@/lib/utils/customFetcher";

export default async function postComment({
  userId,
  content,
  postId,
  accessToken,
}: {
  userId: number;
  content: string;
  postId: string;
  accessToken: string;
}) {
  try {
    const { response, data } = await customFetcher(`/board/${postId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ userId, content }),
    });

    if (!response?.ok) {
      console.error("Failed to fetch data", response?.status);
      throw new Error("Failed to fetch data");
    }

    return await data;
  } catch (error) {
    console.error("Failed to post comment:", error);
    throw new Error("Failed to fetch data");
  }
}

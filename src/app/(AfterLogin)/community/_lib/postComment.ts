import customFetcher from "@/utils/customFetcher";

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
      throw new Error("Failed to fetch data");
    }
    // console.log("res", res);
    // return await res.json();
    return await data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

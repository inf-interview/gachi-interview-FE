import customFetcher from "@/utils/customFetcher";

export default async function getReviewDetail({
  queryKey,
  accessToken,
}: {
  queryKey: [string, string, string];
  accessToken: string;
}) {
  const [_1, _2, postId] = queryKey;

  try {
    const { response, data } = await customFetcher(`/board/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response?.ok) {
      throw new Error("Failed to fetch data");
    }

    return await data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

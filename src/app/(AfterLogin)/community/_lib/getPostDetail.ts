import customFetcher from "@/lib/utils/customFetcher";

export default async function getPostDetail({
  queryKey,
  accessToken,
}: {
  queryKey: [_1: string, _2: string];
  accessToken: string;
}) {
  const [_1, postId] = queryKey;

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

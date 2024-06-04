import customFetcher from "@/lib/utills/customFetcher";

export default async function getMyReviews({
  queryKey,
  userId,
  accessToken,
}: {
  queryKey: [_1: string, _2: string, _3: string];
  userId: number;
  accessToken: string;
}) {
  const [_1, category] = queryKey;
  try {
    const { response, data } = await customFetcher(`/user/${userId}/boards/${category}`, {
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

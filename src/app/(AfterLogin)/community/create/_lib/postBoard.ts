import customFetcher from "@/lib/utills/customFetcher";

export default async function postBoard({
  title,
  content,
  tags,
  category,
  accessToken,
  userId,
}: {
  title: string;
  content: string;
  tags: string[];
  category: string;
  accessToken: string;
  userId: number;
}) {
  try {
    const { response, data } = await customFetcher(`/board/write`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId,
        postTitle: title,
        content,
        tag: tags,
        category,
      }),
    });

    if (!response?.ok) {
      throw new Error("Failed to fetch data");
    }

    return await data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

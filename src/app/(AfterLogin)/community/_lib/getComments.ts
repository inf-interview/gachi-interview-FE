export default async function getComments({
  queryKey,
  accessToken,
}: {
  queryKey: [_1: string, _2: string, _3: string];
  accessToken: string;
}) {
  const [_1, postId, _3] = queryKey;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/board/${postId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.content || [];
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function getComments({
  queryKey,
}: {
  queryKey: [_1: string, _2: number, _3: string];
}) {
  const [_1, postId, _3] = queryKey;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/${postId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

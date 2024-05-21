export default async function getReviewDetail({
  queryKey,
}: {
  queryKey: [string, string, number];
}) {
  const [_1, _2, postId] = queryKey;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/${postId}`, {
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

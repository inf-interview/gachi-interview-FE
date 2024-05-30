export default async function getStudyDetail({
  queryKey,
  accessToken,
}: {
  queryKey: [_1: string, _2: string, _3: string];
  accessToken: string;
}) {
  const [_1, _2, postId] = queryKey;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/board/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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

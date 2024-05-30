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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/board/${postId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ userId, content }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    console.log("res", res);
    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

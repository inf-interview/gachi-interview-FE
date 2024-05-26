export default async function postComment({
  userId,
  content,
  postId,
}: {
  userId: number;
  content: string;
  postId: number;
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/${postId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, content }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

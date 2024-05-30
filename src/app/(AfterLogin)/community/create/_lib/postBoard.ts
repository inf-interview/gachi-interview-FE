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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/board/write`, {
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

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

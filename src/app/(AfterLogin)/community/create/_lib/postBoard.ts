export default async function postBoard({
  title,
  content,
  tags,
  category,
}: {
  title: string;
  content: string;
  tags: string[];
  category: string;
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/write`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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

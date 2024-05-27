export default async function getMyStudies({
  queryKey,
}: {
  queryKey: [_1: string, _2: string, _3: string];
}) {
  const [_1, category] = queryKey;
  try {
    const tags = ["community", "studies", "my"].join(",");
    const queryParams = new URLSearchParams({
      tags,
      category,
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/list?${queryParams}`, {
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
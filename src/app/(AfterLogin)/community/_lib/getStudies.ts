export default async function getStudies({
  queryKey,
  sortType,
  page,
  accessToken,
}: {
  queryKey: [_1: string, _2: string, _3: string, _4: number];
  sortType: string;
  page: number;
  accessToken: string;
}) {
  const [_1, category] = queryKey;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/board/list?page=${page}&sortType=${sortType}&category=${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

import customFetcher from "@/lib/utils/customFetcher";

export default async function getReviews({
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
    const { response, data } = await customFetcher(
      `/board/list?page=${page}&sortType=${sortType}&category=${category}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response?.ok) {
      throw new Error("Failed to fetch data");
    }

    // return await res.json();
    return await data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

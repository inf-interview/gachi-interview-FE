import axios from "axios";

export default async function getReviews({ queryKey }: { queryKey: [_1: string, _2: string] }) {
  const [_1, category] = queryKey;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/list`, {
      params: {
        tags: ["community", "reviews"],
        category,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

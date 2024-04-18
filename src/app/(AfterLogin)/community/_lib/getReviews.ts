import axios from "axios";

export default async function getReviews() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/list`, {
      params: {
        tags: ["community", "reviews"],
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

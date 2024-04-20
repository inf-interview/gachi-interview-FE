import axios from "axios";

export default async function postComment({
  content,
  postId,
}: {
  content: string;
  postId: number;
}) {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/${postId}/submit`, {
      content,
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

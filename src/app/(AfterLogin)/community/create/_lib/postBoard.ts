import axios from "axios";

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
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/write`, {
      postTitle: title,
      content,
      tag: tags,
      category,
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

import axios from "axios";

export default async function getStudyDetail({
  queryKey,
}: {
  queryKey: [_1: string, _2: string, _3: number];
}) {
  const [_1, _2, postId] = queryKey;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/board/${postId}`, {
      params: {
        tags: ["community", "studies", postId],
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

import axios from "axios";

export default async function getComments({
  queryKey,
}: {
  queryKey: [_1: string, _2: number, _3: string];
}) {
  const [_1, postId, _3] = queryKey;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/board/${postId}/comments`,
      {
        params: {
          tags: ["community", postId, "comments"],
        },
      },
    );
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

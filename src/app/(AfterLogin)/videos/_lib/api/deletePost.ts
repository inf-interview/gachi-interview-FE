import customFetcher from "@/utils/customFetcher";

export interface DeletePostProps {
  userId: number;
  videoId: number;
}

const deletePost = async ({ userId, videoId }: DeletePostProps) => {
  const { data } = await customFetcher(`/video/${videoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, videoId }),
  });

  return data;
};

export default deletePost;

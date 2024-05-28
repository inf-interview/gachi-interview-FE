export interface PatchInterviewProps {
  userId: number;
  videoId: string;
  exposure: boolean;
  videoTitle: string;
  tags: string[];
}

const patchInterview = async ({
  userId,
  videoId,
  exposure,
  tags,
  videoTitle,
}: PatchInterviewProps) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/video/${videoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, exposure, tags, videoTitle }),
  });

  if (!response.ok) {
    throw new Error("Failed to patch interview");
  }
  return response.json();
};

export default patchInterview;

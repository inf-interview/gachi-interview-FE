export interface postInterviewProps {
  userId: number;
  exposure: boolean;
  videoLink: string;
  thumbnailLink: string;
  videoTitle: string;
  questions: number[];
  tags: string[];
}
const postInterview = async ({
  userId,
  exposure,
  videoLink,
  thumbnailLink,
  videoTitle,
  questions,
  tags,
}: postInterviewProps) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/interview/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "X-Refresh-Token": localStorage.getItem("refreshToken") || "",
      },
      body: JSON.stringify({
        userId,
        exposure,
        videoLink,
        thumbnailLink,
        videoTitle,
        questions,
        tags,
      }),
    });

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default postInterview;

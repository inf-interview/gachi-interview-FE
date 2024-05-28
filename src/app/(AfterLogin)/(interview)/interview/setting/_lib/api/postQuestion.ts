interface postQuestionProps {
  userId: number;
  questionContent: string;
  answerContent: string;
  workbookId: number;
}

const postQuestion = async ({
  userId,
  questionContent,
  answerContent,
  workbookId,
}: postQuestionProps) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/workbook/${workbookId}/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "X-Refresh-Token": localStorage.getItem("refreshToken") || "",
      },
      body: JSON.stringify({
        userId,
        questionContent,
        answerContent,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default postQuestion;

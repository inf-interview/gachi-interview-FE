interface postWorkbookProps {
  userId: number;
  title: string;
}

const postWorkbook = async ({ userId, title }: postWorkbookProps) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/workbook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "X-Refresh-Token": localStorage.getItem("refreshToken") || "",
      },
      body: JSON.stringify({
        userId,
        title,
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

export default postWorkbook;

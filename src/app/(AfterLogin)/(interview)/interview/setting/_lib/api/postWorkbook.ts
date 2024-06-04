import customFetcher from "@/lib/utills/customFetcher";

interface postWorkbookProps {
  userId: number;
  title: string;
}

const postWorkbook = async ({ userId, title }: postWorkbookProps) => {
  try {
    const { data } = await customFetcher(`/workbook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        title,
      }),
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default postWorkbook;

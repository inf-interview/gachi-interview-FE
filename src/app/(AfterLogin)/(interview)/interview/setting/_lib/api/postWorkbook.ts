import axios from "axios";

interface postWorkbookProps {
  userId: number;
  title: string;
}

const postWorkbook = async ({ userId, title }: postWorkbookProps) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/workbook`, {
      userId,
      title,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default postWorkbook;

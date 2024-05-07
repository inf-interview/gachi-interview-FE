export interface getInterviewsProps {
  sortType: string;
  page: number;
}
const getInterviews = async ({ sortType, page }: getInterviewsProps) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video/list?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default getInterviews;

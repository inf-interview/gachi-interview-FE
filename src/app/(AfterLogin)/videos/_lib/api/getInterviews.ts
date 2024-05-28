export interface getInterviewsProps {
  sortType: string;
  page: number;
}
const getInterviews = async ({ sortType, page }: getInterviewsProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/video/list?page=${page}&sortType=${sortType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "X-Refresh-Token": localStorage.getItem("refreshToken") || "",
        },
      },
    );
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default getInterviews;

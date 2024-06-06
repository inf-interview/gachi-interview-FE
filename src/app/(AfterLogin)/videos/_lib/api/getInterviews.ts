import customFetcher from "@/lib/utills/customFetcher";

export interface getInterviewsProps {
  sortType: "new" | "like";
  page: number;
}
const getInterviews = async ({ sortType, page }: getInterviewsProps) => {
  try {
    const { data } = await customFetcher(`/video/list?page=${page}&sortType=${sortType}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default getInterviews;

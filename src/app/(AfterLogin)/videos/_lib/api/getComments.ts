import customFetcher from "@/lib/utills/customFetcher";

export type getCommentsProps = string;

const getComments = async (videoId: getCommentsProps) => {
  try {
    const { data } = await customFetcher(`/video/${videoId}/comments`, {
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

export default getComments;

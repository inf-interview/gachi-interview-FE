import customFetcher from "@/lib/utills/customFetcher";

const getWorkbookList = async () => {
  try {
    const { response, data } = await customFetcher(`/workbook/list`, {
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

export default getWorkbookList;

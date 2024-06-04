import customFetcher from "@/lib/utills/customFetcher";

export default async function getMyComments({
  userId,
  accessToken,
}: {
  userId: number;
  accessToken: string;
}) {
  try {
    const { response, data } = await customFetcher(`/user/${userId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response?.ok) {
      throw new Error("Failed to fetch data");
    }
    console.log("mycomment data", data);

    return await data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

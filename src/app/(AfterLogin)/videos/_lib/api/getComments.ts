export type getCommentsProps = string;

const getComments = async (videoId: getCommentsProps) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/video/${videoId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json().then((res) => res.content);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default getComments;

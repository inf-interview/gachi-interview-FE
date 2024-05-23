// export default async function getMyVideos({ queryKey }: { queryKey: [_1: string, _2: string] }) {
//   const [_1, category] = queryKey;
//   try {
//     const tags = ["interviews", "my"].join(",");
//     const queryParams = new URLSearchParams({
//       tags,
//       category,
//     });

//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video/list?${queryParams}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     return await res.json();
//   } catch (error) {
//     throw new Error("Failed to fetch data");
//   }
// }
export interface getInterviewsProps {
  sortType: string;
  page: number;
}
const getMyVideos = async ({ sortType, page }: getInterviewsProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/list?page=${page}&sortType=${sortType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};

export default getMyVideos;

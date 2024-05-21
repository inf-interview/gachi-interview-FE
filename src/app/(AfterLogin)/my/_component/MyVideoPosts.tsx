import { useQuery } from "@tanstack/react-query";
import getMyVideos from "../_lib/getMyVideos";
import VideoCard from "../../videos/_component/VideoCard";
import { Video } from "@/model/Video";
import { useGetInterviews } from "../../videos/_lib/queries/useInterviewQuery";

export default function MyVideoPosts({ tabParams }: { tabParams: string | undefined }) {
  // const { data } = useQuery<Video[], Object, Video[], [string, string]>({
  //   queryKey: ["interviews", "my"],
  //   queryFn: ({ page, sortType }: any) => getMyVideos({ page, sortType }),
  //   staleTime: 60 * 1000,
  //   gcTime: 300 * 1000,
  // });
  const sortType = "like";
  const page = 1;
  const { data } = useGetInterviews({ sortType: sortType, page });

  return data?.map((video) => <VideoCard key={video.videoId} video={video} />);
}

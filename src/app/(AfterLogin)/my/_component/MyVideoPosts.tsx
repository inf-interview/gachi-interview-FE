import { useQuery } from "@tanstack/react-query";
import getMyVideos from "../_lib/getMyVideos";
import VideoCard from "../../videos/_component/VideoCard";
import { Video } from "@/model/Video";
import { useRecoilValue } from "recoil";
import { accessTokenState, userIdState } from "@/store/auth";

export default function MyVideoPosts() {
  const accessToken = useRecoilValue(accessTokenState);
  const userId = useRecoilValue(userIdState);

  const { data, error, isLoading } = useQuery<Video[], Object, Video[], [string, string]>({
    queryKey: ["my", "videos"],
    queryFn: () => getMyVideos({ accessToken, userId }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading videos</div>;

  const videos = Array.isArray(data) ? data : [];

  return (
    <>
      {videos.length > 0 ? (
        videos.map((video) => <VideoCard key={video.videoId} video={video} />)
      ) : (
        <div>아직 등록된 인터뷰 영상이 없습니다🥲</div>
      )}
    </>
  );
}

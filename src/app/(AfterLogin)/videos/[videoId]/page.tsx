import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import getInterview from "../_lib/api/getInterview";
import VideoDetail from "./_component/VideoDetail";
import Comments from "./_component/Comments";

interface VideoIdPageProps {
  params: {
    videoId: string;
  };
}

const VideoIdPage = async ({ params }: VideoIdPageProps) => {
  // params가져오기
  const { videoId } = params;
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ["interview", videoId],
    queryFn: () => getInterview(videoId),
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <VideoDetail videoId={videoId} />
      <Comments videoId={videoId} />
    </HydrationBoundary>
  );
};

export default VideoIdPage;

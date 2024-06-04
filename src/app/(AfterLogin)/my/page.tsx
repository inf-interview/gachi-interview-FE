import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import MyContainer from "./_component/MyContainer";
import getMyReviews from "./_lib/getMyReviews";
import getMyStudies from "./_lib/getMyStudies";
import getMyComments from "./_lib/getMyComments";
import getMyVideos from "./_lib/getMyVideos";

export default function Page() {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  queryClient.prefetchQuery({
    queryKey: ["community", "reviews", "my"],
    queryFn: () => getMyReviews,
  });
  queryClient.prefetchQuery({
    queryKey: ["community", "studies", "my"],
    queryFn: () => getMyStudies,
  });
  queryClient.prefetchQuery({ queryKey: ["my", "comments"], queryFn: () => getMyComments });
  queryClient.prefetchQuery({ queryKey: ["my", "videos"], queryFn: () => getMyVideos });

  return (
    <HydrationBoundary state={dehydratedState}>
      <MyContainer />
    </HydrationBoundary>
  );
}

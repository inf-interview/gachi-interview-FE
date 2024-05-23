import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import MyContainer from "./_component/MyContainer";
import getMyReviews from "./_lib/getMyReviews";
import getMyStudies from "./_lib/getMyStudies";

export default function Page() {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  queryClient.prefetchQuery({ queryKey: ["community", "reviews", "my"], queryFn: getMyReviews });
  queryClient.prefetchQuery({ queryKey: ["community", "studies", "my"], queryFn: getMyStudies });

  return (
    <HydrationBoundary state={dehydratedState}>
      <MyContainer />
    </HydrationBoundary>
  );
}

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import getReviews from "./_lib/getReviews";
import getStudies from "./_lib/getStudies";
import CommunityContainer from "./_component/CommunityContainer";

export default function Page() {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  queryClient.prefetchQuery({
    queryKey: ["community", "reviews", "recent", 1],
    queryFn: () => getReviews,
  });
  queryClient.prefetchQuery({
    queryKey: ["community", "studies", "recent", 1],
    queryFn: () => getStudies,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommunityContainer />
    </HydrationBoundary>
  );
}

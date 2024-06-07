import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import getReviews from "./_lib/getReviews";
import getStudies from "./_lib/getStudies";
import CommunityContainer from "./_component/CommunityContainer";
import { Suspense } from "react";

export default function Page() {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  queryClient.prefetchQuery({
    queryKey: ["community", "reviews", "new", 1],
    queryFn: () => getReviews,
  });
  queryClient.prefetchQuery({
    queryKey: ["community", "studies", "new", 1],
    queryFn: () => getStudies,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense>
        <CommunityContainer />
      </Suspense>
    </HydrationBoundary>
  );
}

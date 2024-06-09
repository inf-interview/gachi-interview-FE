import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import CommunityContainer from "./_component/CommunityContainer";
import getBoards from "./_lib/getBoards";

export default function Page({ searchParams }: { searchParams: { tab: string } }) {
  const category = searchParams.tab;
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  queryClient.prefetchQuery({
    queryKey: ["community", category, "new", 1],
    queryFn: () => getBoards,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <CommunityContainer />
    </HydrationBoundary>
  );
}

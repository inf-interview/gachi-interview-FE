import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import getStudyDetail from "./_lib/getStudyDetail";
import GetStudyDetail from "./_component/GetStudyDetail";

export default async function Page({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const { postId } = params;
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ["community", "studies", postId],
    queryFn: getStudyDetail,
  });
  return (
    <HydrationBoundary state={dehydratedState}>
      <GetStudyDetail postId={postId} />
    </HydrationBoundary>
  );
}

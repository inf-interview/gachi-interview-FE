import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import InterviewReviewDetail from "./_component/InterviewReviewDetail";
import getReviewDetail from "./_lib/getReviewDetail";

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
    queryKey: ["community", "reviews", postId],
    queryFn: getReviewDetail,
  });
  return (
    <HydrationBoundary state={dehydratedState}>
      <InterviewReviewDetail postId={postId} />
    </HydrationBoundary>
  );
}

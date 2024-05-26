import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import InterviewReviewDetail from "./_component/InterviewReviewDetail";
import getReviewDetail from "./_lib/getReviewDetail";
import getComments from "../../_lib/getComments";
import Comments from "@/app/(AfterLogin)/_component/Comments";

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

  await queryClient.prefetchQuery({
    queryKey: ["community", postId, "comments"],
    queryFn: ({ queryKey }) =>
      getComments({ queryKey: queryKey as [_1: string, _2: string, _3: string] }),
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <InterviewReviewDetail postId={postId} />
      <Comments postId={postId} />
    </HydrationBoundary>
  );
}

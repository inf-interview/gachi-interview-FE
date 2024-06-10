import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import InterviewReviewDetail from "./_component/InterviewReviewDetail";
import getPostDetail from "../../_lib/getPostDetail";
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
    queryKey: ["community", postId],
    queryFn: () => getPostDetail,
  });

  await queryClient.prefetchQuery({
    queryKey: ["community", postId, "comments"],
    queryFn: () => getComments,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <InterviewReviewDetail postId={postId} />
      <Comments postId={postId} />
    </HydrationBoundary>
  );
}

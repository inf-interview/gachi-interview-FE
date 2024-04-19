import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import getStudyDetail from "./_lib/getStudyDetail";
import GetStudyDetail from "./_component/GetStudyDetail";
import Comments from "@/app/(AfterLogin)/_component/Comments";

export default async function Page({
  params,
}: {
  params: {
    postId: number;
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
      <Comments postId={postId} />
    </HydrationBoundary>
  );
}

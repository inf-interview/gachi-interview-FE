import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import getStudyDetail from "./_lib/getStudyDetail";
import GetStudyDetail from "./_component/GetStudyDetail";
import Comments from "@/app/(AfterLogin)/_component/Comments";
import getComments from "../../_lib/getComments";

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

  await queryClient.prefetchQuery({
    queryKey: ["community", postId, "comments"],
    queryFn: ({ queryKey }) =>
      getComments({ queryKey: queryKey as [_1: string, _2: string, _3: string] }),
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <GetStudyDetail postId={postId} />
      <Comments postId={postId} />
    </HydrationBoundary>
  );
}

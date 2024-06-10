import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import GetStudyDetail from "./_component/GetStudyDetail";
import Comments from "@/app/(AfterLogin)/_component/Comments";
import getComments from "../../_lib/getComments";
import getPostDetail from "../../_lib/getPostDetail";

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
      <GetStudyDetail postId={postId} />
      <Comments postId={postId} />
    </HydrationBoundary>
  );
}

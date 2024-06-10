import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import getPostDetail from "../_lib/getPostDetail";
import EditPostFormContainer from "./_component/EditPostFormContainer";

export default async function Page({ searchParams }: { searchParams: { id: string } }) {
  const postId = searchParams.id;
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ["community", postId],
    queryFn: () => getPostDetail,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <EditPostFormContainer postId={postId} />
    </HydrationBoundary>
  );
}

import PostCard from "./PostCard";
import { Post, PostContent } from "@/model/Post";
import NoData from "../../_component/NoData";

export default function InterviewReview({
  tabParams,
  boardList,
  filteredBoardList,
}: {
  tabParams: string | undefined;
  boardList: PostContent | undefined;
  filteredBoardList: Post[];
}) {
  if (boardList?.content?.length === 0 || filteredBoardList.length === 0) {
    return <NoData message="게시글이 아직 등록되지 않았네요...😰" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {(filteredBoardList.length > 0 ? filteredBoardList : boardList?.content)?.map((post) => (
        <PostCard key={post.postId} post={post} tabParams={tabParams} />
      ))}
    </div>
  );
}

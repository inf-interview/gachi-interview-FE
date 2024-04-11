import Comment from "@/app/(AfterLogin)/_component/Comment";
import CreateComment from "@/app/(AfterLogin)/_component/CommentForm";
import { Badge } from "@/components/ui/badge";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

export default function Page() {
  return (
    <div className="flex-col">
      <div className="w-2/3 m-5 px-6 pt-4 pb-2 border border-gray-300 rounded-md">
        <span className="text-2xl font-bold">스터디 모집 글 제목</span>
        <hr className="mt-2" />
        <p className="my-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a deleniti quidem aspernatur
          quae modi debitis tempore eaque iste in suscipit consequatur veritatis, perspiciatis
          adipisci unde nemo iure animi dolore. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Ab a deleniti quidem aspernatur quae modi debitis tempore eaque iste in suscipit
          consequatur veritatis, perspiciatis adipisci unde nemo iure animi dolore.
        </p>
        <div>
          <Badge>#백엔드</Badge>
          <Badge>#프론트엔드</Badge>
          <Badge>#CS</Badge>
        </div>
        <div className="flex my-3">
          <p className="flex-1 text-gray-600 text-sm mt-2">성 이름 • 1시간전</p>
          <div className="flex">
            <div className="flex items-center">
              <AiOutlineLike className="text-gray-500 mr-1" />
              <span className="text-gray-700 text-sm">3</span>
            </div>
            <div className="flex items-center ml-3">
              <FaRegComment className="text-gray-500 mr-1" />
              <span className="text-gray-700 text-sm">5</span>
            </div>
          </div>
        </div>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <CreateComment />
    </div>
  );
}

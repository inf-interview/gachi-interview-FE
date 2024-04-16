import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function InterviewReview() {
  return (
    <Link href="/community/reviews/1">
      <Card>
        <CardHeader>
          <CardTitle>면접 후기 공유 제목</CardTitle>
          <hr />
          <CardDescription>
            1차 서류 - 2차 과제테스트 - 3차 기술면접 - 4차 인성면접 - 합격 과제는 두가지 유형 중
            선택해서 풀이 후 제출하면 되는데 제출 후 연락까지 2주가 걸렸다. 기술면접은 편한
            분위기라....
          </CardDescription>
        </CardHeader>
        <Badge className="px-3 py-1 text-sm ml-4 mr-1" variant="secondary">
          #프론트엔드
        </Badge>
        <Badge className="px-3 py-1 text-sm mr-1" variant="secondary">
          #프론트엔드
        </Badge>
        <div className="px-6 pt-4 pb-2">
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
          <p className="text-gray-600 text-sm mt-2">성 이름 • 1시간전</p>
        </div>
      </Card>
    </Link>
  );
}

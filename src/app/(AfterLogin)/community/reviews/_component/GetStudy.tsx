import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function GetStudy() {
  return (
    <Link href="/community/studies/1">
      <Card>
        <CardHeader>
          <CardTitle>스터디 모집 제목</CardTitle>
          <hr />
          <CardDescription>
            면접 스터디 같이 하실 분 모집합니다. 면접 스터디 같이 하실 분 모집합니다. 면접 스터디
            같이 하실 분 모집합니다. 면접 스터디 같이 하실 분 모집합니다. 면접 스터디 같이 하실 분
            모집합니다.
          </CardDescription>
        </CardHeader>
        <Badge className="px-3 py-1 text-sm ml-4 mr-1" variant="secondary">
          #면접
        </Badge>
        <Badge className="px-3 py-1 text-sm mr-1" variant="secondary">
          #스터디
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

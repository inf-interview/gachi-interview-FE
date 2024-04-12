import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";

const VideoIdPage = () => {
  return (
    <div className="h-dvh w-full py-20 px-12">
      <div className="flex justify-center w-full">
        <img
          className="w-full object-cover rounded-lg"
          src="https://file.mk.co.kr/meet/neds/2020/03/image_readtop_2020_256728_15839167074119784.jpg"
          alt="면접 영상"
        />
      </div>
      <div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between mt-2">
            <h1 className="text-3xl font-bold">면접 연습 영상</h1>

            <div className="flex items-center">
              <AiOutlineLike className="text-gray-500 mr-1" />
              <span className="text-gray-700">15</span>
              <AiOutlineShareAlt className="text-gray-500 ml-4 mr-1" />
            </div>
          </div>
          <p className="text-gray-500 mt-4">이영재</p>
          <p className="text-gray-500 text-sm">3분 전</p>
          <div className="flex mt-2">
            <div>
              <span className="badge badge-secondary mr-2">#삼성</span>
              <span className="badge badge-secondary mr-2">#네이버</span>
              <span className="badge badge-secondary mr-2">#카카오</span>
              <span className="badge badge-secondary">#BE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <h2 className="text-2xl font-bold">피드백 1</h2>

        <textarea
          className="w-full h-32 mt-4 p-4 rounded-lg border border-gray-300"
          placeholder="이영재님, 피드백을 작성해보세요."
        ></textarea>

        <div className="flex flex-col mt-4">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src="https://file.mk.co.kr/meet/neds/2020/03/image_readtop_2020_256728_15839167074119784.jpg"
              alt="프로필 이미지"
            />
            <div className="flex flex-col ml-4">
              <span className="font-bold">이영재</span>
              <span className="text-gray-500">3분 전</span>
            </div>
          </div>
          <p className="mt-4">잘했어요!</p>
        </div>
      </div>
    </div>
  );
};

export default VideoIdPage;

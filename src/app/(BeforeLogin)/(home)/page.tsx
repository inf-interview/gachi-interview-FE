"use client";

import { Button } from "@/components/ui/button";
import interviewImage from "../../../../public/interview.json";
import dynamic from "next/dynamic";
import { RiKakaoTalkFill } from "react-icons/ri";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex-col">
        <p className="font-bold text-3xl my-10">
          같이 면접 준비하는 서비스 <br />
          같이 면접 <br />
        </p>
        <Button className="w-[350px] h-[70px] rounded-full bg-[#FEE500] text-black text-xl">
          <RiKakaoTalkFill className="mr-2" />
          Kakao로 시작하기
        </Button>
      </div>
      <Lottie play animationData={interviewImage} className="m-20 w-1/3 h-1/3" />
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import interviewImage from "../../public/interview.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

export default function Home() {
  return (
    <>
      <Lottie play animationData={interviewImage} className="w-1/2 h-1/2" />
      <Button>로그인</Button>
    </>
  );
}

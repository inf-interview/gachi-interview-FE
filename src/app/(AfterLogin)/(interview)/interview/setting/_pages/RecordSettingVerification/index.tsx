"use client";

import { useRouter } from "next/navigation";
import { useInterviewOption } from "../../../../_lib/contexts/InterviewOptionContext";
import { useEffect } from "react";
import { useErrorModal } from "@/components/Modal/useModal";

interface RecordSettingVerificationProps {
  setStep: (step: number) => void;
}

const RecordSettingVerification = ({ setStep }: RecordSettingVerificationProps) => {
  const errorModal = useErrorModal();
  const router = useRouter();
  const { interviewOption, mediaOption } = useInterviewOption();

  const validateInterviewOption = () => {
    if (!interviewOption) {
      setStep(1);
      return false;
    }

    if (!interviewOption.questions.length) {
      // TODO: 에러 메시지를 띄운다.
      // TODO: 매직 넘버를 상수로 빼야 한다.
      errorModal("질문을 먼저 선택해주세요.");
      setStep(1);
      return false;
    }

    if (!mediaOption.media) {
      errorModal("녹화를 위한 미디어를 설정해주세요.");
      setStep(2);
      return false;
    }

    return true;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (validateInterviewOption()) {
        router.push("/interview/record");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 pr-48">
      <div className="flex flex-col items-center justify-start h-screen">
        <span className="loader"></span>
        <div className="text-xl font-semibold mt-8">화면을 준비 중 입니다...</div>
      </div>
    </div>
  );
};

export default RecordSettingVerification;

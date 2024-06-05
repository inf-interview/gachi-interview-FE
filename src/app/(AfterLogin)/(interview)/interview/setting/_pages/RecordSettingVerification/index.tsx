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
      errorModal("질문을 선택해주세요.");
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
    if (validateInterviewOption()) {
      router.push("/interview/record");
    }
  }, []);

  return <div className="flex items-center justify-center w-full h-full">로딩중...</div>;
};

export default RecordSettingVerification;

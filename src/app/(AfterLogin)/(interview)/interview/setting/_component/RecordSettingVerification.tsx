"use client";

import { useRouter } from "next/navigation";
import { useInterviewOption } from "../../../_lib/contexts/InterviewOptionContext";
import { useStep } from "../../../_lib/contexts/StepContext";
import { useEffect } from "react";
import { useErrorModal } from "@/components/Modal/useModal";

const RecordSettingVerification = () => {
  const errorModal = useErrorModal();
  const router = useRouter();
  const { interviewOption, mediaOption } = useInterviewOption();
  const { setStep } = useStep();

  const validateInterviewOption = () => {
    if (!interviewOption) {
      setStep(1);
      return false;
    }

    if (!interviewOption.questions.length) {
      // TODO: 에러 메시지를 띄운다.
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
      setStep(1);
      router.push("/interview/record");
    }
  }, []);

  return <div>TODO: 로딩 컴포넌트</div>;
};

export default RecordSettingVerification;

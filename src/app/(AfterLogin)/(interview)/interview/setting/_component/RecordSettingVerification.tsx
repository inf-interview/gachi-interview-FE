"use client";

import { useRouter } from "next/navigation";
import { useInterviewOption } from "../../../_lib/contexts/InterviewOptionContext";
import { useStep } from "../../../_lib/contexts/StepContext";
import { useEffect } from "react";

const RecordSettingVerification = () => {
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
      alert("질문을 선택해주세요.");
      setStep(1);
      return false;
    }

    if (!mediaOption.media) {
      alert("미디어 설정 오류");
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

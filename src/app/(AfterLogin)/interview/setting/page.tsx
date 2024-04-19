"use client";

import { useState } from "react";

import QuestionPick from "./_component/QuestionPick";
import RecordSetting from "./_component/RecordSetting";

// TODO: InterviewOptionType을 공통으로 빼기
export interface InterviewOptionType {
  userId: number;
  public: boolean;
  videoLink: string;
  videoTitle: string;
  questions: number[];
  tags: string[];
}

const SettingPage = () => {
  const [step, setStep] = useState(1);
  // TODO: Context API로 변경
  const [interviewOption, setInterviewOption] = useState<InterviewOptionType>({
    userId: 0,
    public: true,
    videoLink: "",
    videoTitle: "",
    questions: [],
    tags: [],
  });

  return (
    // TODO: 매직 넘버를 상수로 변경
    <div>
      {step === 1 && (
        <QuestionPick
          setStep={setStep}
          setInterviewOption={setInterviewOption}
          interviewOption={interviewOption}
        />
      )}
      {step === 2 && <RecordSetting setStep={setStep} />}
    </div>
  );
};

export default SettingPage;

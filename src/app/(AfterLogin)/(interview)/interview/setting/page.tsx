"use client";

import { useState } from "react";

import QuestionPick from "./_component/QuestionPick";
import RecordSetting from "./_component/RecordSetting";

const SettingPage = () => {
  const [step, setStep] = useState(1);

  return (
    // TODO: 매직 넘버를 상수로 변경
    <div>
      {step === 1 && <QuestionPick setStep={setStep} />}
      {step === 2 && <RecordSetting setStep={setStep} />}
    </div>
  );
};

export default SettingPage;

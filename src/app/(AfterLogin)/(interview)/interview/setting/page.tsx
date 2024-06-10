"use client";

import { useState } from "react";
import QuestionPick from "./_pages/QuestionPick";
import RecordSetting from "./_pages/RecordSetting";
import RecordSettingVerification from "./_pages/RecordSettingVerification";
import Footer from "./_pages/_component/footer";

const SettingPage = () => {
  const [step, setStep] = useState(1);

  return (
    // TODO: 매직 넘버를 상수로 변경
    <div>
      {step === 1 && <QuestionPick />}
      {step === 2 && <RecordSetting />}
      {step === 3 && <RecordSettingVerification setStep={setStep} />}
      <Footer setStep={setStep} step={step} />
    </div>
  );
};

export default SettingPage;

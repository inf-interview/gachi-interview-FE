"use client";

import QuestionPick from "./_pages/QuestionPick";
import RecordSetting from "./_pages/RecordSetting";
import RecordSettingVerification from "./_pages/RecordSettingVerification";
import { useStep } from "../../_lib/contexts/StepContext";
import Footer from "./_pages/_component/footer";

const SettingPage = () => {
  const { step } = useStep();

  return (
    // TODO: 매직 넘버를 상수로 변경
    <div>
      {step === 1 && <QuestionPick />}
      {step === 2 && <RecordSetting />}
      {step === 3 && <RecordSettingVerification />}
      <Footer />
    </div>
  );
};

export default SettingPage;

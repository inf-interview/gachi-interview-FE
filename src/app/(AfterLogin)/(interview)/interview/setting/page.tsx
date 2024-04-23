"use client";

import QuestionPick from "./_component/QuestionPick";
import RecordSetting from "./_component/RecordSetting";
import { useStep } from "../../_lib/contexts/StepContext";
import RecordSettingVerification from "./_component/RecordSettingVerification";

const SettingPage = () => {
  const { step } = useStep();

  return (
    // TODO: 매직 넘버를 상수로 변경
    <div>
      {step === 1 && <QuestionPick />}
      {step === 2 && <RecordSetting />}
      {step === 3 && <RecordSettingVerification />}
    </div>
  );
};

export default SettingPage;

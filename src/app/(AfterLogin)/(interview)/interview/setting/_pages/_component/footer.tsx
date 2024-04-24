import { useStep } from "@/app/(AfterLogin)/(interview)/_lib/contexts/StepContext";
import { Button } from "@/components/ui/button";

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  const { handleNextStep, handlePrevStep, step } = useStep();

  return (
    <div className="mt-4 w-full flex justify-end">
      <Button disabled={step === 1} onClick={() => handlePrevStep()} variant="outline">
        이전
      </Button>
      <Button onClick={() => handleNextStep()} className="ml-2" variant="outline">
        다음
      </Button>
    </div>
  );
};

export default Footer;

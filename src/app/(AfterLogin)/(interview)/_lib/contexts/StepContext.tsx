import React, { createContext, useState, useContext } from "react";

interface StepContextType {
  step: number;
  setStep: (step: number) => void;
  handleNextStep: (validate?: () => boolean) => void;
  handlePrevStep: () => void;
}

const StepContext = createContext<StepContextType | null>(null);

interface StepProviderProps {
  children: React.ReactNode;
}

export const StepProvider = ({ children }: StepProviderProps) => {
  const [step, setStep] = useState(1);

  const handleNextStep = (validate?: () => boolean) => {
    if (validate && !validate()) return;
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <StepContext.Provider value={{ step, setStep, handleNextStep, handlePrevStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = () => {
  const context = useContext(StepContext);

  if (context === null) {
    throw new Error("useStep은 StepProvider 하위에서 사용되어야 합니다.");
  }
  return context;
};

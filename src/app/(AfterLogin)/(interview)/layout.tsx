"use client";

import { ReactNode } from "react";
import { InterviewOptionProvider } from "../(interview)/_lib/contexts/InterviewOptionContext";
import { StepProvider } from "../(interview)/_lib/contexts/StepContext";

interface InterviewLayoutProps {
  children: ReactNode;
}

const InterviewLayout = ({ children }: InterviewLayoutProps) => {
  return (
    <InterviewOptionProvider>
      <StepProvider>{children}</StepProvider>
    </InterviewOptionProvider>
  );
};

export default InterviewLayout;

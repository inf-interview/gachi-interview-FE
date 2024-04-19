"use client";

import { ReactNode } from "react";
import { InterviewOptionProvider } from "../(interview)/_lib/contexts/InterviewOptionContext";

interface InterviewLayoutProps {
  children: ReactNode;
}

const InterviewLayout = ({ children }: InterviewLayoutProps) => {
  return <InterviewOptionProvider>{children}</InterviewOptionProvider>;
};

export default InterviewLayout;

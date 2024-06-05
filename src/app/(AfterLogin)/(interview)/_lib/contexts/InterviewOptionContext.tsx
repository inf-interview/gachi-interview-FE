import React, { createContext, useState, useContext } from "react";

export type QuestionType = {
  questionId: number;
  questionContent: string;
  answerContent: string;
};

export interface InterviewOptionType {
  userId: number;
  exposure: boolean;
  videoLink: string;
  videoTitle: string;
  questions: QuestionType[];
  tags: string[];
}

export interface MediaOptionType {
  media: MediaStream | null;
  selectedMimeType: string;
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>;
}

const InterviewOptionContext = createContext<
  | {
      interviewOption: InterviewOptionType;
      setInterviewOption: React.Dispatch<React.SetStateAction<InterviewOptionType>>;
      mediaOption: MediaOptionType;
      setMediaOption: React.Dispatch<React.SetStateAction<MediaOptionType>>;
    }
  | undefined
>(undefined);

InterviewOptionContext.displayName = "InterviewOptionContext";

interface InterviewOptionProviderProps {
  children: React.ReactNode;
}

export const InterviewOptionProvider = ({ children }: InterviewOptionProviderProps) => {
  const [interviewOption, setInterviewOption] = useState<InterviewOptionType>({
    userId: 0,
    exposure: true,
    videoLink: "",
    videoTitle: "",
    questions: [],
    tags: [],
  });

  const [mediaOption, setMediaOption] = useState<MediaOptionType>({
    media: null,
    selectedMimeType: "",
    mediaRecorderRef: { current: null },
  });

  const value = {
    interviewOption,
    setInterviewOption,
    mediaOption,
    setMediaOption,
  };

  return (
    <InterviewOptionContext.Provider value={value}>{children}</InterviewOptionContext.Provider>
  );
};

export const useInterviewOption = () => {
  const context = useContext(InterviewOptionContext);
  if (!context) {
    throw new Error("useInterviewOption는 InterviewOptionProvider 하위에서 사용되어야 합니다.");
  }
  return context;
};

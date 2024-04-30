import { useEffect, useRef } from "react";
import { useInterviewOption } from "../../../../../../_lib/contexts/InterviewOptionContext";

export const useVideoRef = () => {
  const videoContainerRef = useRef<HTMLVideoElement>(null);
  const { mediaOption } = useInterviewOption();

  useEffect(() => {
    videoContainerRef.current!.srcObject = mediaOption.media;
  }, [mediaOption.media]);

  return videoContainerRef;
};

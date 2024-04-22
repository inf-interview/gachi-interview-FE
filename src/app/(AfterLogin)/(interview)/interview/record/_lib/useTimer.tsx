import { useEffect, useState, useRef } from "react";

interface useTimerProps {
  endSeconds: number;
  onEnd: () => void;
  onTimeChange?: (time: number) => void;
}

const useTimer = ({ endSeconds, onEnd, onTimeChange }: useTimerProps) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        if (!isRunning) {
          return;
        }
        setTime((prev) => prev + 1);
        onTimeChange && onTimeChange(time);
        if (time === endSeconds) {
          onEnd();
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
    onEnd();
  };

  const reset = () => {
    setIsRunning(false);
    onEnd();
    setTime(0);
  };

  return { time: time, start, pause, reset };
};

export default useTimer;

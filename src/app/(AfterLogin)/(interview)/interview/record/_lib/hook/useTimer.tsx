import { useEffect, useState, useRef } from "react";

interface useTimerProps {
  endSeconds: number;
  onStop: () => void;
  onTimeChange?: (time: number) => void;
}

const useTimer = ({ endSeconds, onStop, onTimeChange }: useTimerProps) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const onStopRef = useRef(onStop);

  useEffect(() => {
    onStopRef.current = onStop;
  }, [onStop]);

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    if (isRunning) {
      let innerTime = time;
      timer.current = setInterval(() => {
        innerTime++;
        setTime(innerTime);
        onTimeChange && onTimeChange(innerTime);
        if (innerTime >= endSeconds) {
          clearTimer();
          setIsRunning(false);
          onStopRef.current();
        }
      }, 1000);
    }

    return clearTimer;
  }, [isRunning]);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
    clearTimer();
  };

  const reset = () => {
    setIsRunning(false);
    clearTimer();
    setTime(0);
  };

  return { time, start, pause, reset };
};

export default useTimer;

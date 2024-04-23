import { useEffect, useState } from "react";

interface TimerProps {
  seconds: number;
}

const Timer = ({ seconds }: TimerProps) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-lg font-semibold">{formatTime(seconds)}</span>
    </div>
  );
};

export default Timer;

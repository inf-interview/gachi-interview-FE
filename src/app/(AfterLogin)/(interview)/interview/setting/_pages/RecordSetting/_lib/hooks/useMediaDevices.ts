import { useEffect, useState } from "react";

export const useMediaDevices = () => {
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    // 미디어 디바이스 목록을 가져옵니다.
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioInputDevices = devices.filter((device) => device.kind === "audioinput");
      const videoInputDevices = devices.filter((device) => device.kind === "videoinput");
      setAudioDevices(audioInputDevices);
      setCameraDevices(videoInputDevices);
    });

    return () => {
      setAudioDevices([]);
      setCameraDevices([]);
    };
  }, []);

  return { audioDevices, cameraDevices };
};

import { useEffect, useState } from "react";

export const useMediaDevices = () => {
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
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

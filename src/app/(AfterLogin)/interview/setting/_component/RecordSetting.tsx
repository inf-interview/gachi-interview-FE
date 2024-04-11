import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";

interface RecordSettingProps {
  setStep: (step: number) => void;
}

const RecordSetting = ({ setStep }: RecordSettingProps) => {
  const videoContainerRef = useRef<HTMLVideoElement>(null);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [selectedCameraDevice, setSelectedCameraDevice] = useState<string>("");

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioInputDevices = devices.filter((device) => device.kind === "audioinput");
      const videoInputDevices = devices.filter((device) => device.kind === "videoinput");
      setAudioDevices(audioInputDevices);
      setCameraDevices(videoInputDevices);
    });
  }, []);

  const handleAudioDeviceChange = (deviceId: string) => {
    setSelectedAudioDevice(deviceId);
  };

  const handleCameraDeviceChange = (deviceId: string) => {
    setSelectedCameraDevice(deviceId);
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: { deviceId: selectedAudioDevice } })
      .then((stream) => {
        if (videoContainerRef.current) {
          videoContainerRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col items-center py-20 px-12 w-full">
      <div className="w-full h-96 rounded overflow-hidden relative">
        <AiOutlineReload
          className="absolute z-10 bg-inherit cursor-pointer text-white transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full top-1/2 left-1/2"
          onClick={startRecording}
        />
        <video
          className="w-full h-full rounded block scale-x-[-1] object-contain overflow-clip bg-black"
          autoPlay
          ref={videoContainerRef}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row mt-4 md:justify-center">
        <select
          className="border border-gray-300 rounded-md p-2 text-sm"
          value={selectedCameraDevice}
          onChange={(e) => handleCameraDeviceChange(e.target.value)}
        >
          {cameraDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera Device ${device.deviceId}`}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-300 rounded-md p-2 text-sm md:ml-2 mt-2 md:mt-0"
          value={selectedAudioDevice}
          onChange={(e) => handleAudioDeviceChange(e.target.value)}
        >
          {audioDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Audio Device ${device.deviceId}`}
            </option>
          ))}
        </select>
      </div>
      <div className="ml-auto mt-4">
        <Button onClick={() => setStep(1)} variant="outline">
          이전
        </Button>
        <Button onClick={() => setStep(3)} className="ml-2" variant="outline">
          다음
        </Button>
      </div>
    </div>
  );
};

export default RecordSetting;

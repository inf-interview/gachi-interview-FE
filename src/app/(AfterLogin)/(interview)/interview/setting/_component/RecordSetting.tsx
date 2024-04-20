import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { closeMedia, getMedia } from "@/lib/utills/media";
import { useStep } from "../../../_lib/contexts/StepContext";
import { useInterviewOption } from "../../../_lib/contexts/InterviewOptionContext";

const RecordSetting = () => {
  // TODO: 커스텀 훅으로 분리한다.
  const videoContainerRef = useRef<HTMLVideoElement>(null);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [selectedCameraDevice, setSelectedCameraDevice] = useState<string>("");
  const { handleNextStep, handlePrevStep } = useStep();
  const { mediaOption, setMediaOption } = useInterviewOption();

  const handleAudioDeviceChange = (deviceId: string) => {
    closeMedia(mediaOption.media);
    setSelectedAudioDevice(deviceId);
    getMedia(deviceId, selectedCameraDevice).then((media) => {
      if (media) {
        setMediaOption({
          ...mediaOption,
          media,
        });
      }
    });
  };

  const handleCameraDeviceChange = (deviceId: string) => {
    closeMedia(mediaOption.media);
    setSelectedCameraDevice(deviceId);
    getMedia(selectedAudioDevice, deviceId).then((media) => {
      if (media) {
        setMediaOption({
          ...mediaOption,
          media,
        });
      }
    });
  };

  const reloadRecording = () => {
    closeMedia(mediaOption.media);
    getMedia().then((media) => {
      if (media) {
        setMediaOption({
          ...mediaOption,
          media,
        });
      }
    });
  };

  useEffect(() => {
    videoContainerRef.current!.srcObject = mediaOption.media;
  }, [mediaOption.media]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioInputDevices = devices.filter((device) => device.kind === "audioinput");
      const videoInputDevices = devices.filter((device) => device.kind === "videoinput");
      setAudioDevices(audioInputDevices);
      setCameraDevices(videoInputDevices);
    });

    getMedia().then((media) => {
      if (media) {
        setMediaOption({
          ...mediaOption,
          media,
        });
      }
    });

    return () => {
      closeMedia(mediaOption.media);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-96 rounded overflow-hidden relative">
        {!mediaOption.media && (
          <AiOutlineReload
            className="absolute z-10 bg-inherit cursor-pointer text-white transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full top-1/2 left-1/2"
            onClick={reloadRecording}
          />
        )}
        <video
          className="w-full h-full rounded block scale-x-[-1] object-contain overflow-clip bg-black"
          autoPlay
          playsInline
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
          onChange={(e) => {
            handleAudioDeviceChange(e.target.value);
          }}
        >
          {audioDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Audio Device ${device.deviceId}`}
            </option>
          ))}
        </select>
      </div>
      <div className="ml-auto mt-4">
        <Button onClick={() => handlePrevStep()} variant="outline">
          이전
        </Button>
        <Button onClick={() => handleNextStep()} className="ml-2" variant="outline">
          다음
        </Button>
      </div>
    </div>
  );
};

export default RecordSetting;

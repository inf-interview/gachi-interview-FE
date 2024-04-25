import { useEffect, useState } from "react";
import { getMedia, closeMedia } from "@/lib/utills/media";
import { useInterviewOption } from "../../../../../../_lib/contexts/InterviewOptionContext";

export const useSelectedDevices = () => {
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [selectedCameraDevice, setSelectedCameraDevice] = useState<string>("");
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

  const handleReloadRecording = () => {
    closeMedia(mediaOption.media);
    getMedia(selectedAudioDevice, selectedCameraDevice).then((media) => {
      if (media) {
        setMediaOption({
          ...mediaOption,
          media,
        });
      }
    });
  };

  useEffect(() => {
    handleReloadRecording();
  }, []);

  return {
    selectedAudioDevice,
    selectedCameraDevice,
    handleAudioDeviceChange,
    handleCameraDeviceChange,
    handleReloadRecording,
  };
};

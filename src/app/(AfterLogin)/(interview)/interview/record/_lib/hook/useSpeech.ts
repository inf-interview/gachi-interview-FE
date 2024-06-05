import { useState } from "react";

const useSpeech = () => {
  const [transcript, setTranscript] = useState("");
  const [speechRecognition, setSpeechRecognition] =
    useState<SpeechRecognition | null>(null);

  const onStartListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("이 브라우저에서는 음성인식을 지원하지 않습니다.");
      return;
    }

    const recognition = new SpeechRecognition();
    setSpeechRecognition(recognition);
    recognition.lang = "ko-KR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let speechToText = Array.from(e.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(speechToText);
    };

    recognition.start();
  };

  const onStopListening = () => {
    if (speechRecognition) {
      speechRecognition.stop();
    }
  };

  return {
    transcript,
    onStartListening,
    onStopListening,
  };
};

export default useSpeech;

"use client";

import React, { MutableRefObject } from "react";
import { toBlobURL } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";

type StartRecordingProps = {
  media: MediaStream | null;
  selectedMimeType: string;
  mediaRecorderRef: MutableRefObject<MediaRecorder | null>;
  setRecordedBlobs: React.Dispatch<React.SetStateAction<Blob[]>>;
};

const ffmpeg = new FFmpeg();

ffmpeg.on("log", ({ message }) => {
  console.log(message);
});

export const startRecording = ({
  media,
  selectedMimeType,
  mediaRecorderRef,
  setRecordedBlobs,
}: StartRecordingProps) => {
  try {
    mediaRecorderRef.current = new MediaRecorder(media as MediaStream, {
      mimeType: selectedMimeType,
      videoBitsPerSecond: 300000,
    });

    mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
      if (event.data && event.data.size > 0) {
        setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      console.log("녹화가 종료되었습니다.");
    };

    mediaRecorderRef.current.start();
  } catch (error) {
    console.error("미디어 레코딩 중 오류가 발생했습니다.");
    console.error(error);
  }
};

export const stopRecording = (mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>) => {
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop();
  }
};

export const localDownload = async (blob: Blob) => {
  const mp4Blob = await EncodingWebmToMp4(blob);
  const url = window.URL.createObjectURL(mp4Blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `${"test"}.mp4`;

  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const EncodingWebmToMp4 = async (blob: Blob) => {
  console.time("EncodingWebmToMp4");

  const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd";

  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript"),
    });
  }

  const arrayBuffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  await ffmpeg.writeFile("input.webm", uint8Array);

  try {
    await ffmpeg.exec([
      "-i",
      "input.webm",
      "-c:v",
      "libx264",
      "-preset", // 인코딩 속도 설정
      "ultrafast", // 인코딩 속도 설정
      "-r", // 프레임 레이트 설정
      "30", // 프레임 레이트 설정
      "-crf", // 비디오 품질 설정
      "20", // 0 ~ 51 (낮을수록 높은 품질)
      "-c:a", // 오디오 코덱 설정
      "copy", // 오디오 코덱을 그대로 유지 (복사)
      "-vf", // 비디오 필터 설정
      "format=yuv420p", // mp4에 적합한 픽셀 포맷
      "-movflags", // 빠른 스트리밍을 위한 faststart 플래그
      "+faststart", // 빠른 스트리밍을 위한 faststart 플래그
      "output.mp4",
    ]);
  } catch (error) {
    console.error("ffmpeg 실행 중 오류가 발생했습니다.", error);
  }

  console.log("output.mp4 파일 작성 완료");
  const data = await ffmpeg.readFile("output.mp4");
  const newBlob = new Blob([data], { type: "video/mp4;" });
  console.log(data);

  console.timeEnd("EncodingWebmToMp4");

  return newBlob;
};

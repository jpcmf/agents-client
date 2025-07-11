import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

type RoomParams = {
  id: string;
};

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("Recording not supported in this browser");
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    mediaRecorderRef.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64000,
    });

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    mediaRecorderRef.current.onstart = () => {
      console.log("Recording started");
    };

    mediaRecorderRef.current.onstop = () => {
      console.log("Recording stopped");
    };

    mediaRecorderRef.current.start();
  }

  function stopRecording() {
    setIsRecording(false);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append("file", audio, "audio.webm");

    const response = await fetch(
      `http://localhost:3333/rooms/${params.id}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      console.error("Failed to upload audio");
      return;
    }

    const result = await response.json();
    console.log("Audio uploaded successfully:", result);
  }

  if (!params.id) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording} variant="destructive">
          Stop Recording
        </Button>
      ) : (
        <Button onClick={startRecording}>Start Recording</Button>
      )}
      {isRecording && (
        <p className="text-muted-foreground text-xs">Recording...</p>
      )}
    </div>
  );
}

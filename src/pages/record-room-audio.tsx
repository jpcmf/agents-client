import { useState, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { PlayCircle, StopCircle } from "lucide-react";
import { getApiUrl } from "@/http/api";
import { Button } from "@/components/ui/button";

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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function createRecorder(audio: MediaStream) {
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

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      mediaRecorderRef.current?.stop();
      createRecorder(audio);
    }, 5000);
  }

  function stopRecording() {
    setIsRecording(false);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append("file", audio, "audio.webm");

    const response = await fetch(`${getApiUrl()}/rooms/${params.id}/audio`, {
      method: "POST",
      body: formData,
    });

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
          <StopCircle />
          Stop Recording
        </Button>
      ) : (
        <Button onClick={startRecording}>
          <PlayCircle /> Start Recording
        </Button>
      )}
      {isRecording ? (
        <p className="text-muted-foreground text-xs">Recording...</p>
      ) : (
        <p className="text-muted-foreground text-xs">Paused</p>
      )}
    </div>
  );
}

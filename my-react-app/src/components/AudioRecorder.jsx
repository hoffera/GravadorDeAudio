import { useState, useRef, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";

const AudioRecorder = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [savedRecordings, setSavedRecordings] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    loadSavedRecordings();
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      await saveAudio(audioBlob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const saveAudio = async (audioBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = () => {
      const base64Audio = reader.result;
      const recordings = JSON.parse(localStorage.getItem("recordings") || "[]");
      const newRecording = { id: `audio-${Date.now()}`, data: base64Audio, transcription: "Transcrição aqui" };
      recordings.push(newRecording);
      localStorage.setItem("recordings", JSON.stringify(recordings));
      loadSavedRecordings();
    };
  };

  const loadSavedRecordings = () => {
    const recordings = JSON.parse(localStorage.getItem("recordings") || "[]");
    setSavedRecordings(recordings);
  };

  const deleteRecording = (id) => {
    const recordings = JSON.parse(localStorage.getItem("recordings") || "[]");
    const updatedRecordings = recordings.filter((rec) => rec.id !== id);
    localStorage.setItem("recordings", JSON.stringify(updatedRecordings));
    loadSavedRecordings();
  };

  const downloadRecording = (base64Data, filename) => {
    const link = document.createElement("a");
    link.href = base64Data;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>Gravador de Áudio</h2>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Parar Gravação" : "Iniciar Gravação"}
      </button>

      <h3>Gravações Salvas</h3>
      <div>
      {savedRecordings.map((rec) => (
         <div style={{margin: "0.5rem"}}>
        <AudioPlayer key={rec.id} recording={rec} />
        </div>
      ))}
    </div>
    </div >
  );
};

export default AudioRecorder;

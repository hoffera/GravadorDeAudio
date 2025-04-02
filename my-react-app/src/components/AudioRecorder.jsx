import { useState, useRef, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import "./AudioRecorder.css";

const AudioRecorder = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [savedRecordings, setSavedRecordings] = useState([]);
  const [transcription, setTranscription] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const transcriptionRef = useRef(""); // Variável local para capturar a transcrição final

  useEffect(() => {
    loadSavedRecordings();
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];
    transcriptionRef.current = ""; // Reseta a transcrição anterior
    setTranscription(""); // Reseta o estado da transcrição

    // Configuração do SpeechRecognition
    recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognitionRef.current.lang = "pt-BR";
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
      transcriptionRef.current = transcript.trim(); // Atualiza a referência com a transcrição final
      setTranscription(transcript.trim()); // Atualiza o estado para exibição em tempo real
    };

    recognitionRef.current.onerror = () => {
      console.error("Erro ao transcrever áudio.");
    };

    recognitionRef.current.start(); // Inicia transcrição

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = async () => {
      // Para reconhecimento de voz antes de salvar
      recognitionRef.current.stop();

      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // Salva o áudio e a transcrição final da referência
      await saveAudio(audioBlob, transcriptionRef.current);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    // Adiciona um atraso de 1 segundo antes de parar a gravação
    setTimeout(() => {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }, 1000); // Atraso de 1 segundo (1000 ms)
  };

  const saveAudio = async (audioBlob, transcriptionText) => {
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = () => {
      const base64Audio = reader.result;
      const recordings = JSON.parse(localStorage.getItem("recordings") || "[]");
      const newRecording = { id: `audio-${Date.now()}`, data: base64Audio, transcription: transcriptionText };
      recordings.push(newRecording);
      localStorage.setItem("recordings", JSON.stringify(recordings));
      loadSavedRecordings();
    };
  };

  const loadSavedRecordings = () => {
    const recordings = JSON.parse(localStorage.getItem("recordings") || "[]");
    setSavedRecordings(recordings);
  };

  return (
    <div>
      {
        /* <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Parar Gravação" : "Iniciar Gravação"}
        </button> */
      }

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="record-btn"
      >
        {isRecording && <span className="record-indicator"></span>}
        {isRecording ? "Parar" : "Gravar"}
      </button>

      <h3>Transcrição:</h3>
      <p>{transcription || "Nenhuma transcrição disponível"}</p>

      <h2>Gravações Salvas</h2>

      <div style={{ margin: "1" }}>
        {savedRecordings.map((rec) => (
          <div key={rec.id} style={{ margin: "0.5rem" }}>
            <AudioPlayer recording={rec} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioRecorder;
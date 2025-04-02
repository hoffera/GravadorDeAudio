import React from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ recording, onDelete, onDownload }) => {
  return (
    <div className="audio-player">
      <audio controls src={recording.data}></audio>
      <p><strong>Transcrição:</strong> {recording.transcription || "Sem transcrição"}</p>
      <button onClick={() => onDelete(recording.id)}>🗑 Excluir</button>
      <button onClick={() => onDownload(recording.data, `gravacao-${recording.id}.webm`)}>⬇ Baixar</button>
    </div>
  );
};

export default AudioPlayer;

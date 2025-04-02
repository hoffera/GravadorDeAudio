// import React from "react";
// import "./AudioPlayer.css";

// const AudioPlayer = ({ recording, onDelete, onDownload }) => {
//   return (
//     <div className="audio-player">
//       <audio controls src={recording.data}></audio>
//       <p><strong>Transcrição:</strong> {recording.transcription || "Sem transcrição"}</p>
//       <button onClick={() => onDelete(recording.id)}>🗑 Excluir</button>
//       <button onClick={() => onDownload(recording.data, `gravacao-${recording.id}.webm`)}>⬇ Baixar</button>
//     </div>
//   );
// };

// export default AudioPlayer;


import React, { useRef, useEffect } from "react";

class AudioPlayerElement extends HTMLElement {
  static get observedAttributes() {
    return ["recording", "transcription"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                .audio-player {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: #222;
                    padding: 10px;
                    border-radius: 10px;
                    color: white;
                }
                button {
                    margin: 5px;
                    padding: 5px 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    background: #007bff;
                    color: white;
                }
                button:hover {
                    background: #0056b3;
                }
            </style>
            <div class="audio-player">
                <audio controls></audio>
                <p><strong>Transcrição:</strong> <span class="transcription">Sem transcrição</span></p>
                <button class="delete">🗑 Excluir</button>
                <button class="download">⬇ Baixar</button>
            </div>
        `;
  }

  connectedCallback() {
    this.updateAttributes();

    this.shadowRoot.querySelector(".delete").addEventListener("click", () => {
      onDelete(recording.id);
    });

    this.shadowRoot.querySelector(".download").addEventListener("click", () => {
      const url = this.getAttribute("recording");
      const link = document.createElement("a");
      link.href = url;
      link.download = `gravacao.webm`;
      link.click();
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateAttributes();
    }
  }

  updateAttributes() {
    const audio = this.shadowRoot.querySelector("audio");
    const transcription = this.shadowRoot.querySelector(".transcription");

    audio.src = this.getAttribute("recording") || "";
    transcription.textContent = this.getAttribute("transcription") || "Sem transcrição";
  }
}

customElements.define("audio-player-element", AudioPlayerElement);

const AudioPlayer = ({ recording, onDelete }) => {
  const ref = useRef(null);

  useEffect(() => {
    const playerElement = ref.current;
    if (!playerElement) return;

    playerElement.setAttribute("recording", recording.data);
    playerElement.setAttribute("transcription", recording.transcription || "Sem transcrição");

    const handleDelete = (e) => onDelete(e.detail);
    playerElement.addEventListener("delete", handleDelete);

    return () => {
      playerElement.removeEventListener("delete", handleDelete);
    };
  }, [recording, onDelete]);

  return <audio-player-element ref={ref}></audio-player-element>;
};

export default AudioPlayer;
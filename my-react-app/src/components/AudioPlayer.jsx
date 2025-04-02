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
          background: linear-gradient(45deg, #6a1b9a, #ff4e42); 
          padding: 20px;
          width: 700px;
          border-radius: 12px;
          display: inline-block;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        }

        .audio-player audio {
          width: 100%;
          background: transparent; 
          filter: transparent;  
          border-radius: 8px;
        }

        .transcription {
          font-style: italic;
          color: white;
          margin-top: 10px;
        }
      </style>

      <div class="audio-player">
        <audio controls></audio>
        <div class="transcription">Sem transcrição</div>
      </div>
    `;
  }

  connectedCallback() {
    this.updateAttributes();
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

const AudioPlayer = ({ recording }) => {
  const ref = useRef(null);

  useEffect(() => {
    const playerElement = ref.current;
    if (!playerElement) return;

    // Atualizar atributos apenas quando ambos (áudio e transcrição) estiverem prontos
    playerElement.setAttribute("recording", recording.data || "");
    playerElement.setAttribute("transcription", recording.transcription || "Sem transcrição");

    // Garantir que o áudio seja recarregado
    const audioElement = playerElement.shadowRoot.querySelector("audio");
    if (audioElement) {
      audioElement.load();
    }
  }, [recording]);

  return <audio-player-element ref={ref}></audio-player-element>;
};

export default AudioPlayer;


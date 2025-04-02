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
    }
</style>

<div class="audio-player">
    <audio controls></audio>
    <p><strong>Transcrição:</strong> <span class="transcription">Sem transcrição</span></p>
</div>
        `;
  }

  connectedCallback() {
    this.updateAttributes();

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

const AudioPlayer = ({ recording }) => {
  const ref = useRef(null);

  useEffect(() => {
    const playerElement = ref.current;
    if (!playerElement) return;

    playerElement.setAttribute("recording", recording.data);
    playerElement.setAttribute("transcription", recording.transcription || "Sem transcrição");

    
  }, [recording]);

  return <audio-player-element ref={ref}></audio-player-element>;
};

export default AudioPlayer;

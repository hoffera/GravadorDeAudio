import micLogo from '/icons/mic_icon.png'
import AudioRecorder from "./components/AudioRecorder";

import './App.css'

function App() {
  return (
    <>
      <div>
        <img src={micLogo} className="logo" alt="Mic logo" />
      </div>
      <h1>Gravador de Áudio</h1>
      <h2>
        Grave áudios, transcreva automaticamente e faça o download com praticidade e rapidez.
      </h2>
      <AudioRecorder />
    </>
  )
}

export default App

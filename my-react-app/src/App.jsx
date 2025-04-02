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
      <AudioRecorder />
    </>
  )
}

export default App

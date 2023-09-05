import regeneratorRuntime from "regenerator-runtime";
import SpeechRecognition, { useSpeechRecognition, resetTranscript } from 'react-speech-recognition';
import { useState } from "react";
import toast, {Toaster} from "react-hot-toast"
import {AiFillGithub} from"react-icons/ai"
import './App.css'
import useClipboard from "react-use-clipboard";
import {AiFillInstagram} from "react-icons/ai"
import {AiFillLinkedin} from "react-icons/ai"





function App() {

 
  const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy);
    const copyText = ()=>{
      setTextToCopy(transcript);
  
  // Use navigator.clipboard.writeText to copy the text to the clipboard
  navigator.clipboard.writeText(transcript)
    .then(() => {
      setCopied(true);
      toast.success("Text copied to clipboard");
    })
    .catch(error => {
      console.error('Error copying text to clipboard:', error);
    });
    }
    const clearText = ()=>{

      SpeechRecognition.stopListening(); // Stop listening if it's ongoing
     resetTranscript();
 
  toast.success("Cleared")
    }
    const stopListening = ()=>{
      SpeechRecognition.stopListening();
      toast.success('Listening Stopped')
    }
  const {
    transcript,
   resetTranscript,
    
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const startListening = async () => {
    await SpeechRecognition.startListening({ continuous: true, language: "en" });
    toast.success('Yaho! Listening Started')
  } 
    
  if(!browserSupportsSpeechRecognition){
    console.log(browserSupportsSpeechRecognition)
    return null;
    
  }
  return (
   <>
            <div className="container">
                <h2 >Speech to Text Converter</h2>
                <br/>
                <p>Transform your spoken words into written text effortlessly with our advanced voice recognition technology. Let's Try Now!</p>

                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                   <h4 id='text-clip'>{transcript}</h4>
                  
                </div>

                
                <div className="btn-style">

<button className="btn" onClick={copyText}>
   {isCopied ? 'Copied': 'Copy to clipoard'}
</button>
<button className="btn" onClick={clearText }>Clear Text</button>
<button className="btn" onClick={startListening} >Start Listening</button>
<button className="btn" onClick={stopListening} >Stop Listening</button>

</div>
<div className="footer">


<div className="link">
<span> Developed with love by Anas Ch</span>
<div className="soc-links">
  <a href="https://github.com/Anasch113" target="_blank"><AiFillGithub className="icons"   />
  </a>
<a href="https://www.linkedin.com/in/anas-ch-b0877a263/" target="_blank"> <AiFillLinkedin className="icons" /></a>
 <a href="https://www.instagram.com/arc_the_hacker/" target="_blank"><AiFillInstagram className="icons" />
 </a>
 
</div>
  
</div>
</div>
            </div>
            
            <Toaster/>
        </>
  )
}

export default App

// import React, { useState } from "react";
// import { API_TOKEN, Auth, db, storage } from "../firebase-config";
// import { Loading } from "../loadAnimation";
// import "../generator.css";
// import DownloadIcon from "@mui/icons-material/Download";
// import ShareIcon from "@mui/icons-material/Share";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { collection, addDoc } from "firebase/firestore";
// import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid";
// import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
// import MicIcon from "@mui/icons-material/Mic";
// import PauseIcon from "@mui/icons-material/Pause";
// import ClearIcon from "@mui/icons-material/Clear";

// const Generator = () => {
//   const [loading, setLoading] = useState(false);
//   const [output, setOutput] = useState(null);
//   const [prompt, setPrompt] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [isMicOn, setIsMicOn] = useState(false);

//   const [user] = useAuthState(Auth);
//   const postRef = collection(db, "post");

//   const uploadImage = async () => {
//     if (imageFile !== null) {
//       const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
//       uploadBytes(imageRef, imageFile)
//         .then(() => {
//           getDownloadURL(imageRef)
//             .then((url) => {
//               if (prompt !== "") {
//                 addDoc(postRef, {
//                   prompt: prompt,
//                   image: url,
//                   user: user.displayName,
//                   logo: user.photoURL,
//                 })
//                   .then((res) => alert("posted"))
//                   .catch((err) => console.log(err));
//               }
//             })
//             .catch((err) => console.log(err));
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const input = event.target.elements.input.value;

//     // Add randomness to the input
//     const randomSuffix = Math.random();
//     const randomizedInput = `${input} ${randomSuffix}`;
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/prompthero/openjourney",
//       // "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
//       // "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",

//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${API_TOKEN}`,
//         },
//         body: JSON.stringify({ inputs: randomizedInput }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to generate image");
//     }

//     const blob = await response.blob();
//     setOutput(URL.createObjectURL(blob));
//     setImageFile(new File([blob], "image.png", { type: "image/png" }));
//     setLoading(false);
//   };

//   const downloadImage = () => {
//     const link = document.createElement("a");
//     link.href = output;
//     link.download = "image.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   const startListening = () => {
//     SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
//     setIsMicOn(true);
//   };

//   const stopListening = () => {
//     SpeechRecognition.stopListening();
//     setIsMicOn(false);
//   };

//   if (!browserSupportsSpeechRecognition) {
//     return null;
//   }

//   console.log(transcript);

//   return (
//     <div className="input-container">
//       <div className="gen-form input-container" onSubmit={handleSubmit}>
//         {/* <div className="input-mic mic-clear">
//             <input
//               type="text"
//               className="instruction"
//               name="input"
//               placeholder="Describe what you want to generate..."
//               value={prompt || transcript} // Use the speech-recognized prompt if available
//               onChange={(e) => setPrompt(e.target.value)}
//             />
//             <button id="mic" onClick={isMicOn ? stopListening : startListening}>
//               {isMicOn ? <PauseIcon /> : <MicIcon  />}
//             </button>
//         </div> */}
//         <InputMicClear/>
//         <button type="submit" id="submit-icon">
//           Generate
//         </button>
//       </div>
//       <div>
//         {loading && <div className="loading"><Loading/></div>}
//         {!loading && output && (
//           <div>
//             <img className="result-image" src={output} alt="art" />
//             <div>
//               <button onClick={downloadImage} className="download-button">
//                 <DownloadIcon className="button-icons" />
//               </button>
//               {user && (
//                 <button className="download-button">
//                   <ShareIcon onClick={uploadImage} className="button-icons" />
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
     
//       <div  className="mic-clear">
//         {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
        
//         {/* <button onClick={resetTranscript} disabled={!transcript}>
//           <ClearIcon />
//         </button> */}
//         {/* <button id="place" onClick={isMicOn ? stopListening : startListening}>
//           {isMicOn ? <PauseIcon /> : <MicIcon />}
//         </button> */}
//       </div>

//     </div>
//   );
// };


// export const InputMicClear = ({ prompt, setPrompt, isMicOn, startListening, stopListening, transcript }) => {
//   const handleInputChange = (e) => {
//     setPrompt(e.target.value);
//   };

//   // const handleClearInput = () => {
//   //   setPrompt("");
//   // };

//   return (
//     <div className="input-mic mic-clear">
//       <input 
//         type="text"
//         className="instruction"
//         name="input"
//         placeholder="Describe what you want to generate..."
//         value={prompt || transcript}
//         onChange={handleInputChange}
//       />
//       <button id="mic" onClick={isMicOn ? stopListening : startListening}>
//         {isMicOn ? <PauseIcon /> : <MicIcon />}
//       </button>
//     </div>
//   );
// };



// export default Generator;








import React, { useState } from "react";
import { API_TOKEN, Auth, db, storage } from "../firebase-config";
import { Loading } from "../loadAnimation";
import "../generator.css";
import DownloadIcon from "@mui/icons-material/Download";
import ShareIcon from "@mui/icons-material/Share";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import MicIcon from "@mui/icons-material/Mic";
import PauseIcon from "@mui/icons-material/Pause";
import ClearIcon from "@mui/icons-material/Clear";

const Generator = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [prompt, setPrompt] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isMicOn, setIsMicOn] = useState(false);

  const [user] = useAuthState(Auth);
  const postRef = collection(db, "post");

  const uploadImage = async () => {
    if (imageFile !== null) {
      const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
      uploadBytes(imageRef, imageFile)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              if (prompt !== "") {
                addDoc(postRef, {
                  prompt: prompt,
                  image: url,
                  user: user.displayName,
                  logo: user.photoURL,
                })
                  .then((res) => alert("posted"))
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;

    // Add randomness to the input
    const randomSuffix = Math.random();
    const randomizedInput = `${input} ${randomSuffix}`;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/playgroundai/playground-v2-1024px-aesthetic",
      // "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      // "https://api-inference.huggingface.co/models/prompthero/openjourney",   
    //  "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
    //  "https://api-inference.huggingface.co/models/openskyml/dalle-3-xl",
    // "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", 
    // "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: randomizedInput }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setImageFile(new File([blob], "image.png", { type: "image/png" }));
    setLoading(false);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = output;
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setIsMicOn(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsMicOn(false);
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  console.log(transcript);
  const handleInputChange = (e) => {
        setPrompt(e.target.value);
      };
  return (
    <div className="input-container">
      <form className="gen-form input-container" onSubmit={handleSubmit}>
        <div className="input-mic mic-clear">
            <input
              type="text"
              className="instruction"
              name="input"
              placeholder="Describe what you want to generate..."
              onChange={handleInputChange}
              value={prompt || transcript} // Use the speech-recognized prompt if available
            />
            <div className="clear-mic">
              <div id="clear" onClick={resetTranscript} >
                <ClearIcon />
              </div>
              <div id="mic" onClick={isMicOn ? stopListening : startListening}>
                {isMicOn ? <PauseIcon /> : <MicIcon />}
              </div>
            </div>
            
        </div>
 
        <button type="submit" id="submit-icon">Generate</button>
      </form>
      <div>
        {loading && <div className="loading"><Loading/></div>}
        {!loading && output && (
          <div>
            <img className="generated-image" src={output} alt="art" />
            <div>
              <button onClick={downloadImage} className="download-button">
                <DownloadIcon className="button-icons" />
              </button>
              {user && (
                <button className="download-button">
                  <ShareIcon onClick={uploadImage} className="button-icons" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
     
      <div  className="mic-clear">
        {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
        
        {/* <button onClick={resetTranscript} disabled={!transcript}>
          <ClearIcon />
        </button> */}
        {/* <button id="place" onClick={isMicOn ? stopListening : startListening}>
          {isMicOn ? <PauseIcon /> : <MicIcon />}
        </button> */}
      </div>

    </div>
  );
};

export default Generator;





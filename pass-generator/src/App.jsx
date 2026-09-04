
import {useState } from "react";





function App(){

 const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

const [password, setPassword] = useState("");
const [strength, setStrength] = useState("");

const generatePassword = () => {
  let characters = "";


  if(uppercase){
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if(lowercase){
    characters += "abcdefghijklmnopqrstuvwxyz";
  }
  if(numbers){
    characters += "0123456789";
  }

  if(symbols){
    characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  }
  if(characters.length === 0){
    setPassword("Select an Option");
    return;
  }

  let newPassword = "";

  for(let i = 0; i<length; i++){
    const randomIndex = Math.floor(
      Math.random()* characters.length
    );
    newPassword += characters[randomIndex];
  }

  setPassword(newPassword);

  // for strength calcualte
  let score = 0;

  if(length >= 12) score++;
  if(uppercase) score++;
  if(lowercase) score++;
  if(numbers) score++;
  if(symbols) score++;

  if(score <= 2){
    setStrength("KAMJOR");
  }
  else if(score <=4){
    setStrength("Medium");
  }
  else {
    setStrength("Strong");
  }
};
 const copyPassword = () => {
  if (!password) return;

  navigator.clipboard.writeText(password);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};

  return (

    
     <div className="container">
      <div className="password-box">

        <h1>Password Generator</h1>

        <div className="password-display">
          <input
            type="text"
            value={password}
            placeholder="Your password"
            readOnly
          />

          <button onClick ={copyPassword}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="settings">

          <label>
            Password Length

            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />

            <span>{length}</span>
          </label>

          <label>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase(!uppercase)}
            />
            Uppercase
          </label>

          <label>
            <input
              type="checkbox"
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
            />
            Lowercase
          </label>

          <label>
            <input
              type="checkbox"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />
            Numbers
          </label>

          <label>
            <input
              type="checkbox"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
            />
            Symbols
          </label>

        </div>

        <div className="strength">
          <p>Password Strength</p>

          <div className={`strength-bar ${strength.toLowerCase()}`}></div>

          <span>{strength || "Not generated"}</span>
        </div>

        <button
          className="generate-btn"
          onClick={generatePassword}
        >
          Generate Password
        </button>

      </div>
    </div>

    
  );
}

export default App;

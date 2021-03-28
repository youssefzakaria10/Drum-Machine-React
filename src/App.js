import React, { useState, useRef, useContext, useEffect } from "react";
import { data } from "./data";
function App() {
  const [power, setPower] = useState(true);
  const powerRef = useRef(null);
  const handleClick = (e) => {
    let audio = e.target.querySelector("audio");
    audio.currentTime = 0;
    audio.play().catch((res) => console.log("Unable to play resource"));
  };

  document.addEventListener("keypress", (e) => {
    const pressedKey = data.find((item) => item.keyStroke === e.key);
    if (powerRef.current.checked && pressedKey) {
      const audio = new Audio(pressedKey.audioSrc);
      audio.play().catch((res) => console.log("Unable to play resource"));
    }
  });

  return (
    <section className="container">
      <div className="title">
        <h2>Drum Machine</h2>
        <div className="underline"></div>
      </div>
      <article className="drum-machine">
        <div className="pad-bank">
          {data.map((item) => {
            const { name, audioSrc, keyStroke } = item;
            return (
              <div
                className="drum-pad"
                id={name}
                onClick={(e) => handleClick(e)}
              >
                <audio src={power ? audioSrc : ""} />
                {keyStroke}
              </div>
            );
          })}
        </div>
        <div className="controls">
          <h3>Power</h3>

          <label className="switch">
            <input
              ref={powerRef}
              type="checkbox"
              defaultChecked
              onClick={(e) => setPower(e.target.checked)}
            ></input>
            <span className="slider round"></span>
          </label>
        </div>
      </article>
    </section>
  );
}

export default App;

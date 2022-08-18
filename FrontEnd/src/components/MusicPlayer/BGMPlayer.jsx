import React, { useEffect, useState } from "react";

const BGMPlayer = () => {
  const [volume, setVolume] = useState(0.3);

  const [bgm] = useState(new Audio(require("../../assets/Longing.mp3")));
  useEffect(() => {
    bgm.play = true;
  }, []);
  useEffect(() => {
    bgm.volume = volume;
  }, [volume]);
  return (
    <main>
      <section>
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={(event) => {
            setVolume(event.target.valueAsNumber);
          }}
        />
      </section>
    </main>
  );
};

export default BGMPlayer;

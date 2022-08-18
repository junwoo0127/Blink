import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const BGMPlayer = () => {
  const [volume, setVolume] = useState(0.3);
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(true);
  const handlePlaying = () => {
    setPlaying(true);
  };
  const handleMute = () => {
    setMute(false);
  };
  useEffect(() => {
    setPlaying(true);
  });
  setTimeout(() => {
    handleMute();
  }, 2000);

  return (
    <main style={{ position: "absolute", right: "30%" }}>
      <ReactPlayer
        width="0"
        height="0"
        playing={playing}
        url="Longing.mp3"
        volume={volume}
        controls={true}
        muted={mute}
        loop
      />
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
        {/* <button></button> */}
      </section>
    </main>
  );
};

export default BGMPlayer;

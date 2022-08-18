import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const BGMPlayer = () => {
  const [volume, setVolume] = useState(0.1);
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
  }, []);
  setTimeout(() => {
    handleMute();
  }, 1000);

  return (
    <main
      style={{ position: "absolute", right: "6%", top: "20px", zIndex: "1000" }}
    >
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
          step={0.01}
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

export default React.memo(BGMPlayer);

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";

const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#beaee2"),
  lineHeight: "30px",
  borderRadius: "30px",
  fontSize: "20px",
  padding: "7px 1px",
  // height: 40px;
  // padding: 0 14px 0 0;
  position: "absolute",
  bottom: "0.5%",
  left: "1%",
  maxWidth: "30%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#beaee2",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);
  audio.play();
  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  });
  return [playing, toggle];
};
function MusicPlayer({ url = "../../assets/UCC BGM.mp3" }) {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <ButtonCo fullWidth variant="contained" onClick={toggle}>
        {playing ? "Pause" : "Play"}
      </ButtonCo>
    </div>
  );
}

export default MusicPlayer;

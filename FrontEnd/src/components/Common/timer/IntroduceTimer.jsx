import React, { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";

const padNumber = (num, length) => {
  return String(num).padStart(length, "0");
};

const FreeTalkTimer = (props) => {
  // 아무것도 입력하지 않으면 undefined가 들어오기 때문에 유효성 검사부터..
  const tempMin = props.min ? parseInt(props.min) : 0;
  const tempSec = props.sec ? parseInt(props.sec) : 0;
  // 타이머를 초단위로 변환한 initialTime과 setInterval을 저장할 interval ref
  const initialTime = useRef(tempMin * 60 + tempSec);
  const interval = useRef(null);

  const [sec, setSec] = useState(padNumber(tempSec, 2));
  const [min, setMin] = useState(padNumber(tempMin, 2));
  const [red, setRed] = useState(false);
  useEffect(() => {
    interval.current = setInterval(() => {
      initialTime.current -= 1;
      setMin(padNumber(parseInt(initialTime.current / 60), 2));
      setSec(padNumber(initialTime.current % 60, 2));
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  // 초가 변할 때만 실행되는 useEffect
  // initialTime을 검사해서 0이 되면 interval을 멈춘다.
  const [countSound] = useState(
    new Audio(require("./mixkit-tick-tock-clock-timer-1045.wav"))
  );

  useEffect(() => {
    if (initialTime.current <= 0) {
      clearInterval(interval.current);

      props.setMode(2);
    }
    if (initialTime.current <= 10) {
      setRed(true);
      countSound.volume = 0.5;
      countSound.play();
      if (initialTime.current <= 0) {
        countSound.pause();
      }
    }
  }, [sec]);

  return (
    <div id="ttime">
      {!red ? (
        <div className={red ? "timeout" : null}>
          {min} : {sec}
        </div>
      ) : (
        <div>
          <motion.div
            animate={{
              scale: [1, 2.5, 1],
              originX: 0,
              color: "#c71100",
            }}
            transition={{
              ease: "easeInOut",
              duration: 1,
              repeat: 10,
            }}
          >
            {sec}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FreeTalkTimer;

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import "./styles.css";

export default function App() {
  const [replay, setReplay] = useState(true);
  // Placeholder text data, as if from API
  const placeholderText = [
    { type: "heading1", text: "진짜 너를 보여줘" },
    {
      type: "heading2",
      text: "BLINK",
    },
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Quick and dirt for the example
  //   const handleReplay = () => {
  //     setReplay(!replay);
  //     setTimeout(() => {
  //       setReplay(true);
  //     }, 600);
  //   };

  return (
    <motion.div
      className="App"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="container">
        {placeholderText.map((item, index) => {
          return <AnimatedText {...item} key={index} />;
        })}
      </div>
    </motion.div>
  );
}

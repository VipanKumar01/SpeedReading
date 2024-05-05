// SpeedReading.js

import React, { useState, useEffect } from "react";
import "./SpeedReading.css";
import textArray from "./assets/TextArray";

const TextDisplay = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedArray, setSelectedArray] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const nextWord = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * textArray.length);
    setSelectedArray(textArray[randomIndex]);
  }, []);

  useEffect(() => {
    setProgress(((index + 1) / Object.keys(selectedArray).length) * 100);

    if (index === 0) {
      setStartTime(new Date());
    } else if (index === Object.keys(selectedArray).length - 1) {
      setEndTime(new Date());
    }
  }, [index, selectedArray]);

  const calculateSpeedInSec = () => {
    if (startTime && endTime) {
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      const totalWords = Object.keys(selectedArray).length;
      return (totalWords / totalTimeInSeconds).toFixed(2);
    }
    return 0;
  };

  const calculateSpeedInMin = () => {
    if (startTime && endTime) {
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      const totalWords = Object.keys(selectedArray).length;
      return ((totalWords / totalTimeInSeconds) * 60).toFixed(2);
    }
    return 0;
  };

  return (
    <div className="text-display-container">
      <div className="text-container">
        <h1 className="text">{selectedArray[index]}</h1>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        {index < Object.keys(selectedArray).length - 1 ? (
          <>
            <button onClick={nextWord}>Next</button>
            <p>Total Words: {Object.keys(selectedArray).length}</p>
            <p>Current Word: {index + 1}</p>
          </>
        ) : (
          <div className="finish-cont">
            <h3 className="finished-text">Finished❤️</h3>
            <p>Speed: {calculateSpeedInSec()} words/second</p>
            <p>Speed: {calculateSpeedInMin()} words/minute</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextDisplay;

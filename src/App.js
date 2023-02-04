import React, { useState, useEffect } from "react";
import "./Timer.css";

const Timer = () => {
  const [duration, setDuration] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setDuration((duration) => {
          if (duration <= 0) {
            clearInterval(interval);
            setIsActive(false);
            alert("Time's up!");
            return 0;
          }
          return duration - 1;
        });
      }, 1000);
    } else if (!isActive && duration !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, duration]);

  const handleStart = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setDuration(0);
    setIsActive(false);
  };

  return (
    <div className="timer">
      <input
        type="number"
        value={duration}
        onChange={(event) => setDuration(event.target.value)}
      />
      <div className="controls">
        {isActive ? (
          <button className="button button-pause" onClick={handleStart}>
            Pause
          </button>
        ) : (
          <button className="button button-start" onClick={handleStart}>
            Start
          </button>
        )}
        <button className="button button-reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;

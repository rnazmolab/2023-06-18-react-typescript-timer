import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [paddedHours, setPaddedHours] = useState("00");
  const [paddedMinutes, setPaddedMinutes] = useState("00");
  const [paddedSeconds, setPaddedSeconds] = useState("00");
  const [paddedMilliseconds, setPaddedMilliseconds] = useState("00");

  const startTimer = () => {
    setIsRunning((prevState) => !prevState);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
      }, 10);
    }
    const totalMilliseconds = elapsedTime;
    const calculatedHours = Math.floor(totalMilliseconds / 3600000);
    const remainingMilliseconds = totalMilliseconds % 3600000;
    const calculatedMinutes = Math.floor(remainingMilliseconds / 60000);
    const remainingSeconds = Math.floor(remainingMilliseconds % 60000 / 1000);
    const calculatedMilliseconds = Math.floor((remainingMilliseconds % 1000) / 10);

    const paddedHoursString = String(calculatedHours).padStart(2, "0");
    const paddedMinutesString = String(calculatedMinutes).padStart(2, "0");
    const paddedSecondsString = String(remainingSeconds).padStart(2, "0");
    const paddedMillisecondsString = String(calculatedMilliseconds).padStart(2, "0");

    setPaddedHours(paddedHoursString);
    setPaddedMinutes(paddedMinutesString);
    setPaddedSeconds(paddedSecondsString);
    setPaddedMilliseconds(paddedMillisecondsString);

    return () => clearInterval(interval);
  }, [isRunning, elapsedTime]);

  return (
    <div className="timer">
      <h1>Timer App</h1>
      <div className="elapsed-time">
        {paddedHours}:{paddedMinutes}:{paddedSeconds}.<span className="milliseconds">{paddedMilliseconds}</span>
      </div>
      <div className="controls">
        <button className="button" onClick={startTimer}>{isRunning ? 'Pause' : 'Start'}</button>
        <button className="button" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;

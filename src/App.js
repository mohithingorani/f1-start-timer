import React, { useState, useEffect } from 'react';

import Control from './components/Control';
import SignalGroup from './components/SignalGroup';
import Status from './components/Status';

import './App.css';

const baseTime = 5; // countdown is 5 seconds

const App = () => {
  const [bestTime, setBestTime] = useState(1000000.0);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);

  const [signalPosition, setSignalPosition] = useState(5);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if(!isActive) {
      setIsActive(true);
      setTimer();
      setStartTime(Date.now());
      setReactionTime(0);
    }
    else {
      setIsActive(false);
      const elapsed = elapsedTime - totalTime;
      if (elapsed > 0) { // less than 200ms is a jump start but keep it 0
        setReactionTime(elapsed);
        if(elapsed < bestTime)  
          setBestTime(elapsed);
      } else {
        setReactionTime(-1); // else set to -1 for jump start flag
      }
    }
  }

  const setTimer = () => {
    const rd = 0.3 + 2.7 * Math.random();
    setTotalTime((baseTime+rd) * 1000);
  }

  const tick = () => {
    setElapsedTime(Date.now()-startTime);  // repeat date now VIMP.
    if(elapsedTime < totalTime )
      setSignalPosition(Math.min(5, Math.trunc(elapsedTime/1000)));
    else 
      setSignalPosition(0);
  }


  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => tick(), 5);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
   });
  
  return (
    <div className="App">
      <header className="App-header">
				<h4>F1 LAUNCH TIMER</h4>
			</header>
      <SignalGroup position={signalPosition} />
      <Status
        primary={Math.trunc(reactionTime)} 
        secondary={Math.trunc(bestTime)}
      />
      <Control mode={isActive ? 'LAUNCH' : 'START'} handleClick = {handleClick} />
      <footer className="App-footer">
        <h6>
          Created by&nbsp;
          <a href="https://mohithingorani.com" target="_blank" rel="noopener noreferrer">
            Mohit Hingorani
          </a>
        </h6>
			</footer>
    </div>
  );
};

export default App;
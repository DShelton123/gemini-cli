import React, { useState, useEffect } from 'react';
import Tube from './Tube';
import '../App.css';

const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
const TUBE_CAPACITY = 3;;

const initialTubes = [
  ['#FF0000', '#00FF00', '#0000FF'],
  ['#FF0000', '#00FF00', '#FFFF00'],
  ['#0000FF', '#FFFF00', '#00FF00'],
  [],
  [],
];

const Game = () => {
  const [tubes, setTubes] = useState(initialTubes);
  const [selectedTube, setSelectedTube] = useState<number | null>(null);
  const [win, setWin] = useState(false);

  useEffect(() => {
    checkWinCondition();
  }, [tubes]);

  const handleTubeClick = (index: number) => {
    if (selectedTube === null) {
      setSelectedTube(index);
    } else {
      if (selectedTube !== index) {
        pour(selectedTube, index);
      }
      setSelectedTube(null);
    }
  };

  const pour = (fromIndex: number, toIndex: number) => {
    const fromTube = [...tubes[fromIndex]];
    const toTube = [...tubes[toIndex]];

    if (fromTube.length === 0) return;

    const colorToPour = fromTube[fromTube.length - 1];

    if (toTube.length < TUBE_CAPACITY && (toTube.length === 0 || toTube[toTube.length - 1] === colorToPour)) {
      const newFromTube = fromTube.slice(0, fromTube.length - 1);
      const newToTube = [...toTube, colorToPour];

      const newTubes = [...tubes];
      newTubes[fromIndex] = newFromTube;
      newTubes[toIndex] = newToTube;

      setTubes(newTubes);
    }
  };

  const checkWinCondition = () => {
    const isWin = tubes.every(tube => {
      if (tube.length === 0) return true;
      if (tube.length === TUBE_CAPACITY) {
        const firstColor = tube[0];
        return tube.every(color => color === firstColor);
      }
      return false;
    });
    setWin(isWin);
  };

  const resetGame = () => {
    setTubes(initialTubes);
    setWin(false);
  };

  return (
    <div className="game-container">
      <div className="game-board">
        {tubes.map((tube, index) => (
          <Tube key={index} liquids={tube} onClick={() => handleTubeClick(index)} isSelected={selectedTube === index} />
        ))}
      </div>
      {win && <div className="win-message">You Win!</div>}
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default Game;

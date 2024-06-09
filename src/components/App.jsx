import React, { useState } from 'react';
import './App.css';

const choices = ['Piedra', 'Papel', 'Tijeras'];
const MAX_SCORE = 10;

const getComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const determineWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return 'Es un empate!';
  } else if (
    (playerChoice === 'Piedra' && computerChoice === 'Tijeras') ||
    (playerChoice === 'Papel' && computerChoice === 'Piedra') ||
    (playerChoice === 'Tijeras' && computerChoice === 'Papel')
  ) {
    return '¡Ganaste!';
  } else {
    return 'Perdiste! Intenta de nuevo';
  }
};

function App() {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  const handleChoice = choice => {
    if (gameOver) return;

    const computerSelection = getComputerChoice();
    const gameResult = determineWinner(choice, computerSelection);
    setPlayerChoice(choice);
    setComputerChoice(computerSelection);
    setResult(gameResult);

    if (gameResult === '¡Ganaste!') {
      const newPlayerScore = playerScore + 1;
      setPlayerScore(newPlayerScore);
      if (newPlayerScore === MAX_SCORE) {
        setGameOver(true);
        setWinner('¡Ganaste el juego!');
      }
    } else if (gameResult === 'Perdiste! Intenta de nuevo') {
      const newComputerScore = computerScore + 1;
      setComputerScore(newComputerScore);
      if (newComputerScore === MAX_SCORE) {
        setGameOver(true);
        setWinner('La computadora ganó el juego');
      }
    }
  };

  const resultClass =
    result === '¡Ganaste!'
      ? 'win'
      : result === 'Perdiste! Intenta de nuevo'
      ? 'lose'
      : result === 'Es un empate!'
      ? 'draw'
      : '';

  return (
    <div className="App">
      <h1>Piedra, Papel, Tijeras</h1>
      <div className="choices">
        {choices.map(choice => (
          <button
            key={choice}
            onClick={() => handleChoice(choice)}
            disabled={gameOver}
          >
            {choice}
          </button>
        ))}
      </div>
      {playerChoice && (
        <div className="results">
          <p>Tú elegiste: {playerChoice}</p>
          <p>La computadora eligió: {computerChoice}</p>
          <p className={resultClass}>{result}</p>
        </div>
      )}
      <div className="scores">
        <div className="player">
          <p>Puntuación del Jugador:</p>
          <p className="numbers">{playerScore}</p>
        </div>
        <div className="computer">
          <p>Puntuación de la Computadora:</p>
          <p className="numbers">{computerScore}</p>
        </div>
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>{winner}</h2>
          <button onClick={() => window.location.reload()}>
            Reiniciar el Juego
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';

const WORDS = ['application', 'programming', 'interface', 'wizard'];
const MAX_MISTAKE_COUNT = 6;

function App() {
  const [selectedWord, setSelectedWord] = useState(() => getRandomWord(WORDS));
  const [gameStatus, setGameStatus] = useState('playing');
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (evt) => {
      const {key, keyCode} = evt;
      if (gameStatus === 'playing' && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
  
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(prevCorrectLetters => [...prevCorrectLetters, letter])
          } else {
            if (!hasNotification) {
              showNotification(setHasNotification);
            }
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(prevWrongLetters => [...prevWrongLetters, letter]);
          } else {
            if (!hasNotification) {
              showNotification(setHasNotification);
            }
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [selectedWord, gameStatus, correctLetters, wrongLetters, hasNotification]);

  useEffect(() => {
    setGameStatus(checkGameStatus(selectedWord, correctLetters, wrongLetters));
  }, [selectedWord, correctLetters, wrongLetters]);

  function playAgain() {
    setGameStatus('playing');
    setCorrectLetters([]);
    setWrongLetters([]);
    setSelectedWord(getRandomWord(WORDS));
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure mistakeCount={wrongLetters.length}/>
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        gameStatus={gameStatus}
        selectedWord={selectedWord}
        playAgain={playAgain}
      />
      <Notification show={hasNotification} />
    </>
  );
}


function getRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
};

function checkGameStatus(selectedWord, correctLetters, wrongLetters) {
  let status = 'win';

  //check for win
  for (const letter of selectedWord) {
    if (!correctLetters.includes(letter)) {
      status = 'playing';
      break;
    }
  }

  //check for lose
  if (wrongLetters.length === MAX_MISTAKE_COUNT) {
    status = 'lose';
  }

  return status;
}

export default App;

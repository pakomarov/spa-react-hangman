import React from 'react';

const Popup = ({ gameStatus, selectedWord, playAgain}) => {
  const revealMessage = getRevealMessage(gameStatus, selectedWord);
  return (
    <div className="popup-container" style={ gameStatus === 'playing' ? {} : {display: 'flex'} }>
      <div className="popup">
        <h2>{getFinalMessage(gameStatus)}</h2>
        { revealMessage && <h3>{revealMessage}</h3>}
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

function getFinalMessage(gameStatus) {
  if (gameStatus === 'win') {
    return 'Congratulations! You won! 😃';
  }
  if (gameStatus === 'lose') {
    return 'Unfortunately you lost. 😕';
  }
  return '';
}

function getRevealMessage(gameStatus, selectedWord) {
  return gameStatus === 'lose' ? `... the word was ${selectedWord}` : '';
}

export default Popup;

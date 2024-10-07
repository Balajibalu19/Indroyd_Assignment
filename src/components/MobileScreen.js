// src/components/MobileScreen.js
import React from 'react';

const MobileScreen = ({ onJoin, onAnswer, question }) => {
  const [playerName, setPlayerName] = React.useState('');

  const handleJoinClick = () => {
    if (playerName) {
      onJoin(playerName);
    }
  };

  const handleSubmitAnswer = (answer) => {
    onAnswer(answer);
  };

  return (
    <div className="mobile-screen">
      <h2>Join the Game</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button className="button join-button" onClick={handleJoinClick}>Join</button>

      <h3>{question.text}</h3>
      <div>
        {question.options.map((option) => (
          <button
            key={option}
            className="button submit-button"
            onClick={() => handleSubmitAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileScreen;

// src/components/ComputerScreen.js
import React from 'react';

const ComputerScreen = ({ question, players, message }) => {
  return (
    <div>
      <h2>Question</h2>
      <p>{question.question}</p>
      <ul>
        {Object.entries(question.options).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <h3>Players</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      {message && <h4>{message}</h4>}
    </div>
  );
};

export default ComputerScreen;

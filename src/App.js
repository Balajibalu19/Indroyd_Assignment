import React, { useState } from 'react';
import './App.css';
import questions from './data/questions';
import ComputerScreen from './components/ComputerScreen';
import MobileScreen from './components/MobileScreen';
import QRCodeComponent from './components/QRCodeComponent';

const App = () => {
  const [players, setPlayers] = useState([]); // Player names state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index
  const [playerAnswers, setPlayerAnswers] = useState({}); // Store player answers
  const [message, setMessage] = useState(''); // Feedback message
  const [isQRScanned, setIsQRScanned] = useState(false); // State to track if QR code is scanned

  const currentQuestion = questions[currentQuestionIndex];
  const localIP = 'http://192.168.182.254:3000'; // Your local IP address

  // Function to handle player joining the game
  const handleJoin = (playerName) => {
    setPlayers((prevPlayers) => [...prevPlayers, playerName]);
    setIsQRScanned(true); // QR code is scanned, hide it
  };

  // Function to handle player answers
  const handleAnswer = (answer) => {
    const correctAnswer = currentQuestion.answer;
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (answer === correctAnswer) {
      setMessage(`Congratulations ${players[players.length - 1]}! Correct Answer!`);
      setPlayerAnswers((prev) => ({
        ...prev,
        [players[players.length - 1]]: 'Correct',
      }));

      // Proceed to next question or show game over
      if (nextQuestionIndex < questions.length) {
        setTimeout(() => {
          setCurrentQuestionIndex(nextQuestionIndex);
          setMessage('');
        }, 2000);
      } else {
        setTimeout(() => {
          setMessage('Game Over! Thanks for playing!');
        }, 2000);
      }
    } else {
      setMessage(`Sorry ${players[players.length - 1]}, that's the wrong answer.`);
      setPlayerAnswers((prev) => ({
        ...prev,
        [players[players.length - 1]]: 'Wrong',
      }));
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-extrabold text-center">QuizConnect: Live Trivia Challenge</h1>

      {/* Conditionally render the QR code based on whether it's been scanned */}
      {!isQRScanned ? (
        <div className="flex justify-center my-5">
          <QRCodeComponent url={localIP} /> {/* Pass the correct local IP here */}
        </div>
      ) : (
        <div className="text-center my-5 text-lg text-green-600">
          QR Code scanned successfully! You are now connected.
        </div>
      )}

      {/* Render ComputerScreen with current question and player info */}
      <ComputerScreen
        question={currentQuestion}
        players={players}
        message={message}
      />

      {/* Render MobileScreen with join and answer handling */}
      <MobileScreen
        onJoin={handleJoin}
        onAnswer={handleAnswer}
        question={currentQuestion}
      />

      {/* Player Responses Section */}
      <h3 className="text-xl font-semibold my-3">Player Responses:</h3>
      <div className="bg-white shadow-md rounded-lg p-4">
        <ul className="list-none">
          {Object.entries(playerAnswers).map(([player, response]) => (
            <li key={player} className="py-1 border-b border-gray-200">
              {`${player}: ${response}`}
            </li>
          ))}
        </ul>
      </div>

      {/* Display feedback message */}
      {message && <div className="text-lg text-green-600 text-center my-4">{message}</div>}
    </div>
  );
};

export default App;

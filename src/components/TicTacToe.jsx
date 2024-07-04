import { useState, useEffect } from "react";
import "../App.css";
import Buttons from "./But";
import Turn from "./Turn";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const TicTacToe = () => {
  const [hiddn, setHiddn] = useState("flex");
  const [hidd, setHidd] = useState("hidden");
  const [winner, setWinner] = useState("hidden");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [getLineStyle, setGetLineStyle] = useState("hidden");
  const [waiting, setWaiting] = useState(true);
  const [symbol, setSymbol] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [message, setMessage] = useState("hidden");

  useEffect(() => {
    socket.on("waiting-for-opponent", () => {
      setMessage("Waiting for Opponent. . .");
      setWaiting(true);
    });

    socket.on("game-start", ({ gameId, symbol }) => {
      setMessage("Game Start");
      setGameId(gameId);
      setSymbol(symbol);
      setWaiting(false);
      socket.emit("new-game");
    });

    socket.on(
      "move-made",
      ({ board, hiddn, hidd, winner, getLineStyle, currentPlayer }) => {
        setBoard(board);
        setHiddn(hiddn);
        setHidd(hidd);
        setWinner(winner);
        setGetLineStyle(getLineStyle);
        setCurrentPlayer(currentPlayer);
      }
    );

    socket.on("opponent-disconnected", () => {
      setMessage("Your Opponent Has Disconnected.");
      setBoard(Array(9).fill(null));
      setWaiting(true);
    });

    return () => {
      socket.off("waiting-for-opponent");
      socket.off("game-start");
      socket.off("move-made");
      socket.off("opponent-disconnected");
    };
  }, []);

  const handleNewGame = () => {
    socket.emit("new-game");
  };

  const handleClick = (i) => {
    if (
      board[i] === null &&
      winner === "hidden" &&
      currentPlayer === socket.id
    ) {
      socket.emit("make-move", { gameId, i });
    }
  };

  return (
    <>
      <div className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-black">
        <div>
          <h2 className={`text-2xl text-white`}>{message}</h2>
        </div>
        <div
          onClick={handleNewGame}
          className="bg-white text-black rounded-full m-3 p-3 text-lg font-bold cursor-pointer"
        >
          New Game
        </div>
        <div className="w-60 h-60 relative flex flex-col text-center">
          <div className="flex">
            <div onClick={() => handleClick(0)}>
              <Buttons hid={board[0]} hidd="hidden" />
            </div>
            <div onClick={() => handleClick(1)}>
              <Buttons hid={board[1]} />
            </div>
            <div onClick={() => handleClick(2)}>
              <Buttons hid={board[2]} />
            </div>
          </div>
          <div className="flex">
            <div onClick={() => handleClick(3)}>
              <Buttons hid={board[3]} />
            </div>
            <div onClick={() => handleClick(4)}>
              <Buttons hid={board[4]} />
            </div>
            <div onClick={() => handleClick(5)}>
              <Buttons hid={board[5]} />
            </div>
          </div>
          <div className="flex">
            <div onClick={() => handleClick(6)}>
              <Buttons hid={board[6]} />
            </div>
            <div onClick={() => handleClick(7)}>
              <Buttons hid={board[7]} />
            </div>
            <div onClick={() => handleClick(8)}>
              <Buttons hid={board[8]} />
            </div>
          </div>
          <div className={`absolute ${getLineStyle} cross-line`}></div>
        </div>
        <div className="text-white">
          {winner === "hidden" ? (
            <div className="flex items-center">
              <h1 className={`text-3xl`}>It's </h1>
              <Turn hiddn={hiddn} hidd={hidd} />
              <h1 className={`text-3xl`}>'s Turn</h1>
            </div>
          ) : (
            <div className="flex items-center">
              <Turn hiddn={hidd} hidd={hiddn} />
              <h1 className={`text-3xl ${winner}`}>Is Winner</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TicTacToe;

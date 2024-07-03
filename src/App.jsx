import { useState } from "react";
import "./App.css";
import Buttons from "./components/But";
import Turn from "./components/Turn";

function App() {
  const [hiddn, sethiddn] = useState("flex");
  const [hidd, sethidd] = useState("hidden");
  const [winner, setWinner] = useState("hidden");
  const [a, seta] = useState(Array(9).fill(null));
  const [getLineStyle, setGetLineStyle] = useState("hidden");

  const handleNewGame = () => {
    let b = [];
    for (let i = 0; i < 9; i++) {
      b[i] = null;
    }
    seta(b);
    setWinner("hidden");
    setGetLineStyle("hidden");
    sethiddn("flex");
    sethidd("hidden");
  };
  const handleClick = (i) => {
    const b = [...a];
    if (b[i] === null && winner === "hidden") {
      if (hidd === "flex") {
        b[i] = "O";
        if (b[0] === "O" && b[1] === "O" && b[2] === "O") {
          setGetLineStyle("horizontal-line-1");
          setWinner("O");
        } else if (b[3] === "O" && b[4] === "O" && b[5] === "O") {
          setGetLineStyle("horizontal-line-2");
          setWinner("O");
        } else if (b[6] === "O" && b[7] === "O" && b[8] === "O") {
          setGetLineStyle("horizontal-line-3");
          setWinner("O");
        } else if (b[0] === "O" && b[3] === "O" && b[6] === "O") {
          setGetLineStyle("vertical-line-1");
          setWinner("O");
        } else if (b[1] === "O" && b[4] === "O" && b[7] === "O") {
          setGetLineStyle("vertical-line-2");
          setWinner("O");
        } else if (b[2] === "O" && b[5] === "O" && b[8] === "O") {
          setGetLineStyle("vertical-line-3");
          setWinner("O");
        } else if (b[0] === "O" && b[4] === "O" && b[8] === "O") {
          setGetLineStyle("diagonal-line-1");
          setWinner("O");
        } else if (b[2] === "O" && b[4] === "O" && b[6] === "O") {
          setGetLineStyle("diagonal-line-2");
          setWinner("O");
        }
      } else {
        b[i] = "X";
        if (b[0] === "X" && b[1] === "X" && b[2] === "X") {
          setGetLineStyle("horizontal-line-1");
          setWinner("X");
        } else if (b[3] === "X" && b[4] === "X" && b[5] === "X") {
          setGetLineStyle("horizontal-line-2");
          setWinner("X");
        } else if (b[6] === "X" && b[7] === "X" && b[8] === "X") {
          setGetLineStyle("horizontal-line-3");
          setWinner("X");
        } else if (b[0] === "X" && b[3] === "X" && b[6] === "X") {
          setGetLineStyle("vertical-line-1");
          setWinner("X");
        } else if (b[1] === "X" && b[4] === "X" && b[7] === "X") {
          setGetLineStyle("vertical-line-2");
          setWinner("X");
        } else if (b[2] === "X" && b[5] === "X" && b[8] === "X") {
          setGetLineStyle("vertical-line-3");
          setWinner("X");
        } else if (b[0] === "X" && b[4] === "X" && b[8] === "X") {
          setGetLineStyle("diagonal-line-1");
          setWinner("X");
        } else if (b[2] === "X" && b[4] === "X" && b[6] === "X") {
          setGetLineStyle("diagonal-line-2");
          setWinner("X");
        }
      }
      seta(b);
      hiddn === "hidden" ? sethiddn("flex") : sethiddn("hidden");
      hidd === "hidden" ? sethidd("flex") : sethidd("hidden");
    }
  };
  return (
    <>
      <div className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-black">
        <div
          onClick={handleNewGame}
          className="bg-white text-black rounded-full m-3 p-3 text-lg font-bold cursor-pointer"
        >
          New Game
        </div>
        <div className="w-60 h-60 relative flex flex-col text-center">
          <div className="flex">
            <div onClick={() => handleClick(0)}>
              <Buttons hid={a[0]} hidd="hidden" />
            </div>
            <div onClick={() => handleClick(1)}>
              <Buttons hid={a[1]} />
            </div>
            <div onClick={() => handleClick(2)}>
              <Buttons hid={a[2]} />
            </div>
          </div>
          <div className="flex">
            <div onClick={() => handleClick(3)}>
              <Buttons hid={a[3]} />
            </div>
            <div onClick={() => handleClick(4)}>
              <Buttons hid={a[4]} />
            </div>
            <div onClick={() => handleClick(5)}>
              <Buttons hid={a[5]} />
            </div>
          </div>
          <div className="flex">
            <div onClick={() => handleClick(6)}>
              <Buttons hid={a[6]} />
            </div>
            <div onClick={() => handleClick(7)}>
              <Buttons hid={a[7]} />
            </div>
            <div onClick={() => handleClick(8)}>
              <Buttons hid={a[8]} />
            </div>
          </div>
          <div className={`absolute ${getLineStyle} cross-line`}></div>;
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
}

export default App;

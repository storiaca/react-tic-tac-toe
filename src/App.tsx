import { useEffect, useState } from "react";
import Cell from "./components/Cell";

import { WINNING_COMBINATIONS } from "./utils/winningCombinations";
import { INITIAL_GAME_BOARD } from "./utils/initialGameBoard";

function App() {
  const [cells, setCells] = useState(INITIAL_GAME_BOARD);

  const [firstGo, setFirstGo] = useState("cross");

  const [winner, setWinner] = useState("");

  let checkArray = cells.every((cell) => cell !== "");

  useEffect(() => {
    checkWinner();
  }, [cells]);

  function checkWinner() {
    WINNING_COMBINATIONS.forEach((comb) => {
      let crossWinner = comb.every((cell) => cells[cell] === "cross");
      let circleWinner = comb.every((cell) => cells[cell] === "circle");

      if (crossWinner) {
        setWinner("Winner is Cross!!");
        return;
      } else if (circleWinner) {
        setWinner("Winner is Circle!!");
        return;
      } else if (checkArray) {
        setWinner("We dont have a winner");
      }
    });
  }

  function handleResetGame() {
    if (winner || checkArray) {
      let emptyArray = new Array(9).fill("");
      setCells(emptyArray);
      setWinner(null);
    }
  }

  return (
    <div className="app">
      <h1 className="title">X/O Game</h1>

      <div className="squareContainer">
        {cells.map((cell, index) => {
          return (
            <Cell
              key={index}
              id={index}
              cell={cell}
              cells={cells}
              setCells={setCells}
              firstGo={firstGo}
              setFirstGo={setFirstGo}
              winner={winner}
            />
          );
        })}
        <button onClick={handleResetGame}>Reset Game</button>

        {winner && <h2>{winner}</h2>}
      </div>
    </div>
  );
}

export default App;

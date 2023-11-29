import {useState} from "react";

import {Bomb} from "../src/booscaminas/icon/Bomb";

import {MATRIX, cantBoxes, Matrix} from "./booscaminas/helpers/generateMatrix";
function App() {
  const [clicked, setClcicked] = useState<string[]>([]);
  const [lost, setLost] = useState(false);

  const handleLost = () => {
    const audio = new Audio("./boo.mp3");

    audio.volume = 0.05;
    audio.play();
    setLost(true);
  };
  const win = clicked.length === cantBoxes * cantBoxes - cantBoxes;

  const handleClick = ({rowIndex, cellIndex}: {rowIndex: number; cellIndex: number}) => {
    if (lost) return;
    if (MATRIX[rowIndex][cellIndex] === Matrix.B) {
      handleLost();
    }
    setClcicked((prevState) => prevState.concat(`${rowIndex}-${cellIndex}`));
  };
  const resetGame = () => {
    setClcicked([]);
    setLost(false);
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-body">
      <main className="w-full max-w-md mx-auto text-center">
        <h1 className="mt-20 font-mono text-2xl">Booscaminas</h1>
        <section className="mt-10">
          {MATRIX.map((row, rowIndex) => (
            <article key={rowIndex} className="flex">
              {row.map((cell, cellIndex) => (
                <div
                  key={`${rowIndex}-${cellIndex}`}
                  className={`flex items-center justify-center w-20 h-10 border border-white ${
                    clicked.includes(`${rowIndex}-${cellIndex}`) ? "bg-gray-600" : "bg-transparent"
                  }`}
                >
                  {clicked.includes(`${rowIndex}-${cellIndex}`) ? (
                    <span className="">
                      {cell === Matrix.B ? <Bomb /> : cell === 0 ? null : cell}
                    </span>
                  ) : (
                    <button
                      className="w-full h-full"
                      type="button"
                      onClick={() => handleClick({rowIndex, cellIndex})}
                    />
                  )}
                </div>
              ))}
            </article>
          ))}
        </section>
        {lost && (
          <article className="mt-2 font-mono text-2xl">
            <p>You lost</p>
            <button className="p-2 mx-auto mt-10 border-2 border-white" onClick={resetGame}>
              Play again!
            </button>
          </article>
        )}
        {win && (
          <article className="mt-2 font-mono text-2xl">
            <p>
              You Wins! <br /> congratulations
            </p>
            <button className="p-2 mx-auto mt-10 border-2 border-white" onClick={resetGame}>
              Play again!
            </button>
          </article>
        )}
      </main>
    </div>
  );
}
export default App;

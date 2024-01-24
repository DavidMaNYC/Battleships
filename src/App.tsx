import React, { useState } from "react";
import { Board } from "./components/Board";
import { checkForWin, createInitialGrid } from "./utils/functions";

interface IShip {
  name: string;
  size: number;
  x?: number;
  y?: number;
  orientation?: "Horizontal" | "Vertical";
}

const initialShips: IShip[] = [
  { name: "Cruiser", size: 3 },
  { name: "Submarine", size: 3 },
  { name: "Battleship", size: 4 },
  { name: "Carrier", size: 5 },
];

export const App = () => {
  const [playerGrid, setPlayerGrid] = useState<string[][]>(createInitialGrid());
  const [computerGrid, setComputerGrid] = useState<string[][]>(
    createInitialGrid()
  );
  const [placedShips, setPlacedShips] = useState<IShip[]>([]);
  const [shipOrientation, setShipOrientation] = useState<
    "Horizontal" | "Vertical"
  >("Horizontal");
  const [gamePhase, setGamePhase] = useState<"placement" | "battle">(
    "placement"
  );
  const [playerTurn, setPlayerTurn] = useState<boolean>(false);
  const [winner, setWinner] = useState<"player" | "opponent" | null>(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [remainingShips, setRemainingShips] = useState<IShip[]>(initialShips);

  const handleCellClick = (x: number, y: number) => {
    if (gameFinished) {
      return;
    }
    if (gamePhase === "placement") {
      if (playerGrid[x][y] === "ship") {
        removeShip(x, y);
      } else if (remainingShips.length) {
        placeShip(x, y, remainingShips[0]);
      }
    } else if (gamePhase === "battle" && playerTurn) {
      if (computerGrid[x][y] === "hit" || computerGrid[x][y] === "miss") {
        return;
      }
      attack(computerGrid, x, y, setComputerGrid, () =>
        handleGameEnd("player")
      );
      setPlayerTurn(false);
      // setTimeout(() => {
      computerMove();
      setPlayerTurn(true);
      // }, 500);
    }
  };

  const placeShip = (x: number, y: number, ship: IShip) => {
    if (!remainingShips?.length) {
      return;
    }
    if (isPlacementValid(x, y, ship.size, shipOrientation, playerGrid)) {
      const newGrid = [...playerGrid];

      for (let i = 0; i < ship.size; i++) {
        if (shipOrientation === "Horizontal") {
          newGrid[x][y + i] = "ship";
        } else {
          newGrid[x + i][y] = "ship";
        }
      }

      setPlayerGrid(newGrid);
      setPlacedShips([
        ...placedShips,
        { ...ship, x, y, orientation: shipOrientation },
      ]);
      setRemainingShips(remainingShips.filter((s) => s.name !== ship.name));
    } else {
      alert("Invalid placement. Please try another position.");
    }
  };

  const removeShip = (x: number, y: number) => {
    const shipToRemove = placedShips.find((ship) => {
      if (
        ship.x === undefined ||
        ship.y === undefined ||
        ship.orientation === undefined
      ) {
        return false;
      }
      return ship.orientation === "Horizontal"
        ? ship.x === x && ship.y <= y && ship.y + ship.size > y
        : ship.y === y && ship.x <= x && ship.x + ship.size > x;
    });

    if (
      shipToRemove &&
      shipToRemove.x !== undefined &&
      shipToRemove.y !== undefined
    ) {
      const newGrid = [...playerGrid];
      for (let i = 0; i < shipToRemove.size; i++) {
        if (shipToRemove.orientation === "Horizontal") {
          newGrid[shipToRemove.x][shipToRemove.y + i] = "empty";
        } else {
          newGrid[shipToRemove.x + i][shipToRemove.y] = "empty";
        }
      }

      setPlayerGrid(newGrid);
      setPlacedShips(placedShips.filter((ship) => ship !== shipToRemove));
      setRemainingShips([...remainingShips, shipToRemove]);
    }
  };

  const isPlacementValid = (
    x: number,
    y: number,
    size: number,
    orientation: "Horizontal" | "Vertical",
    grid: string[][]
  ) => {
    if (orientation === "Horizontal") {
      if (y + size > grid[0].length) return false;
      for (let i = 0; i < size; i++) {
        if (grid[x][y + i] !== "empty") return false;
      }
    } else {
      if (x + size > grid.length) return false;
      for (let i = 0; i < size; i++) {
        if (grid[x + i][y] !== "empty") return false;
      }
    }
    return true;
  };

  const toggleOrientation = () => {
    setShipOrientation(
      shipOrientation === "Horizontal" ? "Vertical" : "Horizontal"
    );
  };

  const startBattle = () => {
    if (remainingShips.length > 0) {
      alert("You must place all ships before starting the battle.");
      return;
    }
    const ComputerGridWithShips = placeShipsRandomlyForComputer();
    setComputerGrid(ComputerGridWithShips);
    setGamePhase("battle");
    setPlayerTurn(true);
  };

  const attack = (
    grid: string[][],
    x: number,
    y: number,
    setGrid: React.Dispatch<React.SetStateAction<string[][]>>,
    onWin: () => void
  ) => {
    const newGrid = [...grid];
    newGrid[x][y] = newGrid[x][y] === "ship" ? "hit" : "miss";
    setGrid(newGrid);

    if (checkForWin(newGrid)) {
      onWin();
    }
  };

  const handleGameEnd = (winner: "player" | "opponent") => {
    const message =
      winner === "player"
        ? "Congratulations! You have sunk all the Computer's ships!"
        : "The Computer has sunk all your ships. Game over!";

    alert(message);
    setWinner(winner);
    setGameFinished(true);
  };

  const computerMove = () => {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (playerGrid[x][y] === "hit" || playerGrid[x][y] === "miss");

    attack(playerGrid, x, y, setPlayerGrid, () => handleGameEnd("opponent"));
  };

  const placeShipsRandomlyForComputer = () => {
    const newGrid = createInitialGrid();
    initialShips.forEach((ship) => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const orientation = Math.random() > 0.5 ? "Horizontal" : "Vertical";

        if (isPlacementValid(x, y, ship.size, orientation, newGrid)) {
          for (let i = 0; i < ship.size; i++) {
            if (orientation === "Horizontal") {
              newGrid[x][y + i] = "ship";
            } else {
              newGrid[x + i][y] = "ship";
            }
          }
          placed = true;
        }
      }
    });
    return newGrid;
  };

  const resetGame = () => {
    setPlayerGrid(createInitialGrid());
    setComputerGrid(createInitialGrid());
    setRemainingShips(initialShips);
    setPlacedShips([]);
    setShipOrientation("Horizontal");
    setGamePhase("placement");
    setPlayerTurn(false);
    setWinner(null);
    setGameFinished(false);
  };

  return (
    <div className="app-container">
      {gamePhase === "placement" && (
        <>
          <h2>Ship Placement Phase</h2>
          <p>Place your ships on the grid:</p>
          <ul>
            {initialShips.map((ship) => (
              <li key={ship.name}>
                {ship.name} (Size: {ship.size}) -{" "}
                {placedShips.some((s) => s.name === ship.name) ? (
                  <strong className="red-text">Placed</strong>
                ) : (
                  <strong className="green-text"> Available</strong>
                )}
              </li>
            ))}
          </ul>
          <>
            {remainingShips.length > 0 && (
              <p>
                Current Ship:
                <strong>{remainingShips[0]?.name}</strong>
                (Size: {remainingShips[0]?.size})
              </p>
            )}
            <p>
              Orientation: <strong>{shipOrientation}</strong>
            </p>
            <div className="button-container">
              <button onClick={toggleOrientation}>Toggle Orientation</button>
              <button
                onClick={startBattle}
                disabled={remainingShips.length > 0}
              >
                Start Battle
              </button>
            </div>
          </>
          <p>Select a starting cell on the grid for the front of the ship.</p>
          <Board grid={playerGrid} onCellClick={handleCellClick} />

          {remainingShips.length > 0 && (
            <p className="red-text">
              Please place all ships to start the battle.
            </p>
          )}
        </>
      )}
      {gamePhase === "battle" && (
        <>
          {gameFinished && (
            <h1>
              {winner === "player" ? "You won!" : "Your opponent has won."}
            </h1>
          )}
          <div>
            <h1>Your Board</h1>
            <Board grid={playerGrid} onCellClick={() => {}} />
          </div>
          <div>
            <h1>Opponents's Board</h1>
            <Board
              grid={computerGrid}
              onCellClick={handleCellClick}
              hideShips={true}
            />
          </div>
          {gameFinished && <button onClick={resetGame}>New Game</button>}
        </>
      )}
    </div>
  );
};

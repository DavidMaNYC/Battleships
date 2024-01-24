import React from "react";
import { Cell } from "./Cell";

type BoardProps = {
  grid: string[][];
  onCellClick: (x: number, y: number) => void;
  hideShips?: boolean;
};

export const Board: React.FC<BoardProps> = ({
  grid,
  onCellClick,
  hideShips = false,
}) => {
  return (
    <div className="board-container">
      <div className="grid-container">
        {grid.map((row, x) =>
          row.map((cell, y) => (
            <Cell
              key={`${x}-${y}`}
              testid={hideShips ? "opponent-cell" : "your-cell"}
              status={hideShips && cell === "ship" ? "empty" : cell}
              onClick={() => onCellClick(x, y)}
            />
          ))
        )}
      </div>
    </div>
  );
};

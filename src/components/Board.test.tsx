import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Board } from "./Board";

describe("Board", () => {
  it("renders the board", () => {
    const mockGrid = [
      ["empty", "empty"],
      ["empty", "empty"],
    ];
    render(<Board grid={mockGrid} onCellClick={() => {}} hideShips={false} />);

    const cells = screen.getAllByRole("cell");
    expect(cells.length).toBe(4);
  });
});

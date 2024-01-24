import { describe, it, expect } from "vitest";
import { createInitialGrid, checkForWin } from "./functions";

describe("createInitialGrid", () => {
  it("should create a 10x10 grid of empty strings", () => {
    const grid = createInitialGrid();
    expect(grid).toHaveLength(10);
    grid.forEach((row) => {
      expect(row).toHaveLength(10);
      row.forEach((cell) => expect(cell).toBe("empty"));
    });
  });
});
describe("checkForWin", () => {
  it('returns true if no cells are "ship"', () => {
    const grid = new Array(10)
      .fill(null)
      .map(() => new Array(10).fill("empty"));
    expect(checkForWin(grid)).toBe(true);
  });

  it('returns false if any cell is "ship"', () => {
    const grid = new Array(10)
      .fill(null)
      .map(() => new Array(10).fill("empty"));
    grid[0][0] = "ship";
    expect(checkForWin(grid)).toBe(false);
  });
});

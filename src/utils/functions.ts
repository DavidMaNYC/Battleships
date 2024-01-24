export const checkForWin = (grid: string[][]): boolean => {
  return grid.every((row) => row.every((cell) => cell !== "ship"));
};

export const createInitialGrid = (): string[][] => {
  return new Array(10).fill(null).map(() => new Array(10).fill("empty"));
};

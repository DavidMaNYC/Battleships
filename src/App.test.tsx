import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { App } from "./App";
import "@testing-library/jest-dom";

describe("App", () => {
  beforeEach(() => {
    global.window.alert = vi.fn();
    render(<App />);
  });

  it("renders ship placement phase initially", () => {
    expect(screen.getByText("Ship Placement Phase")).toBeInTheDocument();
    expect(
      screen.getByText("Cruiser (Size: 3) - Available")
    ).toBeInTheDocument();
  });

  it("allows ship placement on the grid", async () => {
    const firstCell = screen.getAllByRole("cell")[0];
    fireEvent.click(firstCell);
    await waitFor(() => {
      expect(firstCell).toHaveStyle(`background-color: rgb(128, 128, 128)`);
    });
  });

  it("transitions to battle phase after placing all ships", async () => {
    const cells = screen.getAllByRole("cell");
    fireEvent.click(cells[0]);
    fireEvent.click(cells[10]);
    fireEvent.click(cells[20]);
    fireEvent.click(cells[30]);

    const startBattleButton = screen.getByText("Start Battle");
    fireEvent.click(startBattleButton);

    await waitFor(() => {
      expect(screen.getByText("Your Board")).toBeInTheDocument();
      expect(screen.getByText("Opponents's Board")).toBeInTheDocument();
    });
  });

  it("handles user interactions in battle phase", async () => {
    const cells = screen.getAllByRole("cell");
    fireEvent.click(cells[0]);
    fireEvent.click(cells[10]);
    fireEvent.click(cells[20]);
    fireEvent.click(cells[30]);

    const startBattleButton = screen.getByText("Start Battle");
    fireEvent.click(startBattleButton);

    await waitFor(() => {
      expect(screen.getByText("Your Board")).toBeInTheDocument();
      expect(screen.getByText("Opponents's Board")).toBeInTheDocument();
    });
    const opponentCells = screen.getAllByTestId("opponent-cell");
    const specificOpponentCell = opponentCells[0];
    fireEvent.click(specificOpponentCell);
  });

  it("ends the game when all ships are destroyed", async () => {
    const cells = screen.getAllByRole("cell");
    fireEvent.click(cells[0]);
    fireEvent.click(cells[10]);
    fireEvent.click(cells[20]);
    fireEvent.click(cells[30]);

    const startBattleButton = screen.getByText("Start Battle");
    fireEvent.click(startBattleButton);

    await waitFor(() => {
      expect(screen.getByText("Your Board")).toBeInTheDocument();
      expect(screen.getByText("Opponents's Board")).toBeInTheDocument();
    });
    const opponentCells = screen.getAllByTestId("opponent-cell");
    await waitFor(() => {
      opponentCells.forEach((opponentCell) => {
        fireEvent.click(opponentCell);
      });
    });

    await waitFor(() => {
      const youWon = screen.queryByText("You won!");
      const opponentWon = screen.queryByText("Your opponent has won.");
      expect(youWon || opponentWon).toBeInTheDocument();
    });
  });
});

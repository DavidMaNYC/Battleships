import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Cell } from "./Cell";
import "@testing-library/jest-dom";

describe("Cell", () => {
  it("renders with the correct background color based on status", () => {
    const { rerender } = render(<Cell status="hit" onClick={() => {}} />);
    expect(screen.getByRole("cell")).toHaveStyle(
      "background-color: rgb(255, 0, 0)"
    );

    rerender(<Cell status="miss" onClick={() => {}} />);
    expect(screen.getByRole("cell")).toHaveStyle(
      "background-color: rgb(0, 0, 255)"
    );

    rerender(<Cell status="ship" onClick={() => {}} />);
    expect(screen.getByRole("cell")).toHaveStyle(
      "background-color: rgb(128, 128, 128)"
    );

    rerender(<Cell status="empty" onClick={() => {}} />);
    expect(screen.getByRole("cell")).toHaveStyle(
      "background-color: rgb(255, 255, 255)"
    );
  });

  it("responds to click events", () => {
    const handleClick = vi.fn();
    render(<Cell status="empty" onClick={handleClick} />);

    fireEvent.click(screen.getByRole("cell"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

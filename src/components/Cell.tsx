import React from "react";

type CellProps = {
  status: string;
  onClick: () => void;
  testid?: string;
};

export const Cell: React.FC<CellProps> = ({ status, onClick, testid }) => {
  const getBackgroundColor = () => {
    switch (status) {
      case "hit":
        return "red";
      case "miss":
        return "blue";
      case "ship":
        return "gray";
      default:
        return "white";
    }
  };

  return (
    <div
      role="cell"
      data-testid={testid}
      onClick={onClick}
      style={{
        width: "30px",
        height: "30px",
        backgroundColor: getBackgroundColor(),
        border: "1px solid black",
      }}
    ></div>
  );
};

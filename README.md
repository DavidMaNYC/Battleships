# Battleship Game Development

## Overview

This project is a simplified version of the classic Battleship game, allowing a single player to play against a computer opponent. This repository contains the source code for the game, which is developed using TypeScript with React (compatible with Next.js).

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
2. Npm install

### Start the development server:

Command:
-npm run dev

## Game Rules

The game consists of two phases: ship placement and attack phase.
In the ship placement phase, players place a set of 4 ships on a 10x10 grid.
Ships must not overlap or collide.
During the attack phase, the player and the computer take turns attacking each other's grid.
The game is won when all the opponent's ships are destroyed.

## Game Board UX

The board is a 10x10 grid.
The player's grid shows ship placements, while the opponent's (CPU) grid is hidden unless a ship is hit.

## Ship Placement

Ships of lengths 5, 4, 3, and 3 must be placed on the board.
Ships are placed by clicking on the desired starting cell in the grid and are oriented horizontally by default.
Orientation can be toggled before placing a ship.

## Gameplay

After all ships are placed, the battle begins.
Click on the opponent's grid to attack.
The game ends when all ships of either the player or the computer are sunk.

## Tests

Command:
-npm run test

## Notes

Lines 56 and 59 in App.tsx are commented out for testing purposes. However, if you want the opponent's actions to feel more realistic with some time delay, you can uncomment those lines.

import { Scene } from 'phaser';
import { WIDTH, HEIGHT, isSet } from '$lib/logic/feltUtils';
import { testMap, testPlayers } from '$lib/test';

export class Grid {
  scene: Scene;
  cellSize: number;
  gridWidth: number;
  gridHeight: number;

  constructor(scene: Scene, cellSize: number) {
    this.scene = scene;
    this.cellSize = cellSize;
    this.gridWidth = WIDTH;
    this.gridHeight = HEIGHT + 1;

    this.createGrid();
    this.renderCells();
  }

  createGrid() {
    const grid = this.scene.add.grid(
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      this.gridWidth * this.cellSize,
      this.gridHeight * this.cellSize,
      this.cellSize,
      this.cellSize,
      0x000000,
      0,
      0xffffff,
      1
    );
    grid.setOrigin(0.5);

    const border = this.scene.add.rectangle(
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2,
      this.gridWidth * this.cellSize,
      this.gridHeight * this.cellSize,
      0x000000,
      0
    );
    border.setStrokeStyle(2, 0xffffff);
    border.setOrigin(0.5);
  }

  renderCells() {
    for (let col = 0; col < this.gridHeight - 1; col++) {
      for (let row = 0; row < this.gridWidth; row++) {
        if (isSet(testMap, HEIGHT - 1 - col, WIDTH - row)) {
          this.addCell(row, col, 0x000000);
        }
        if (isSet(testPlayers, HEIGHT - 1 - col, WIDTH - row)) {
          this.addCell(row, col, 0xff0000);
        }
      }
    }
  }

  addCell(row: number, col: number, color: number) {
    const x =
      this.scene.game.canvas.width / 2 -
      (this.gridWidth * this.cellSize) / 2 +
      row * this.cellSize +
      this.cellSize / 2;
    const y =
      this.scene.game.canvas.height / 2 -
      (this.gridHeight * this.cellSize) / 2 +
      col * this.cellSize +
      this.cellSize / 2;
    this.scene.add.rectangle(
      x,
      y,
      this.cellSize - 2,
      this.cellSize - 2,
      color,
      1
    );
  }
}

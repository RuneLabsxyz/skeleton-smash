import { Scene } from 'phaser';
import { WIDTH, HEIGHT } from '$lib/logic/feltUtils';

export class Player {
  scene: Scene;
  sprite: Phaser.GameObjects.Rectangle | undefined;
  position: { x: number; y: number };
  canMove: boolean;
  cellSize: number;

  constructor(scene: Scene, cellSize: number) {
    this.scene = scene;
    this.cellSize = cellSize;
    this.canMove = true;
    this.position = {
      x: Math.floor(WIDTH / 2),
      y: HEIGHT, 
    };

    this.createSprite();
    this.setupInput();
  }

  createSprite() {
    const { x, y } = this.calculatePosition();
    this.sprite = this.scene.add.rectangle(
      x,
      y,
      this.cellSize - 2,
      this.cellSize - 2,
      0x00ff00,
      1
    );
  }

  calculatePosition() {
    const x =
      this.scene.game.canvas.width / 2 -
      (WIDTH * this.cellSize) / 2 +
      this.position.x * this.cellSize +
      this.cellSize / 2;
    const y =
      this.scene.game.canvas.height / 2 -
      ((HEIGHT + 1) * this.cellSize) / 2 +
      this.position.y * this.cellSize +
      this.cellSize / 2;
    return { x, y };
  }

  setupInput() {
    this.scene.input.keyboard?.on('keydown-LEFT', this.moveLeft, this);
    this.scene.input.keyboard?.on('keydown-RIGHT', this.moveRight, this);
    this.scene.input.keyboard?.on('keydown-UP', this.spawn, this);
  }

  moveLeft() {
    if (!this.canMove) return;
    if (this.position.x > 0) {
      this.position.x -= 1;
      this.updatePosition();
    }
  }

  moveRight() {
    if (!this.canMove) return;
    if (this.position.x < WIDTH - 1) {
      this.position.x += 1;
      this.updatePosition();
    }
  }

  spawn() {
    if (!this.canMove) return;
    console.log('Spawn function called');
    this.canMove = false;
    // TODO: request to torii
  }

  updatePosition() {
    if (!this.sprite) return;
    const { x, y } = this.calculatePosition();
    this.sprite.setPosition(x, y);
  }

  unlockMovement() {
    this.canMove = true;
  }
}

import { EventBus } from '../eventBus';
import { Scene } from 'phaser';
import { testMap, testPlayers } from "$lib/test";
import { HEIGHT, isSet, WIDTH } from "$lib/logic/feltUtils";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera | undefined;
    background: Phaser.GameObjects.Image | undefined;
    player: Phaser.GameObjects.Rectangle | undefined;
    playerPosition: { x: number, y: number } = { x: 0, y: 0 };
    canMove: boolean = true;
    cellSize: number = 0;

    constructor () {
        super('Game');
    }

    create () {
        this.camera = this.cameras.main;

        this.background = this.add.image(0,  this.game.canvas.height * -1, 'ground');
        this.background.setOrigin(0);
        this.background.displayWidth = this.game.canvas.width; 
        this.background.displayHeight = this.game.canvas.height * 2; 

        const gridWidth = WIDTH;
        const gridHeight = HEIGHT + 1;
        const verticalPadding = 50; 
        this.cellSize = Math.min(
            this.game.canvas.width / gridWidth, 
            (this.game.canvas.height - (verticalPadding * 2)) / gridHeight
        );

        const grid = this.add.grid(
            this.game.canvas.width / 2,     // x position (center)
            this.game.canvas.height / 2,    // y position (center) 
            gridWidth * this.cellSize,           // width
            gridHeight * this.cellSize,          // height
            this.cellSize,                       // cell width
            this.cellSize,                       // cell height
            0x000000,                       // fill color
            0,                              // fill alpha
            0xffffff,                       // line color
            1                               // line alpha
        );

        const border = this.add.rectangle(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            gridWidth * this.cellSize,
            gridHeight * this.cellSize,
            0x000000,
            0
        );
        border.setStrokeStyle(2, 0xffffff);
        border.setOrigin(0.5);

        grid.setOrigin(0.5);

        for (let col = 0; col < gridHeight - 1; col++) {
            for (let row = 0; row < gridWidth; row++) {
                if (isSet(testMap, HEIGHT - 1 - col, WIDTH - row)) {
                    this.add.rectangle(
                        this.game.canvas.width / 2 - (gridWidth * this.cellSize / 2) + (row * this.cellSize) + this.cellSize / 2,
                        this.game.canvas.height / 2 - (gridHeight * this.cellSize / 2) + (col * this.cellSize) + this.cellSize / 2,
                        this.cellSize - 2,
                        this.cellSize - 2,
                        0x000000,
                        1
                    );
                }
                if (isSet(testPlayers, HEIGHT - 1 - col, WIDTH - row)) {
                    this.add.rectangle(
                        this.game.canvas.width / 2 - (gridWidth * this.cellSize / 2) + (row * this.cellSize) + this.cellSize / 2,
                        this.game.canvas.height / 2 - (gridHeight * this.cellSize / 2) + (col * this.cellSize) + this.cellSize / 2,
                        this.cellSize - 2,
                        this.cellSize - 2,
                        0xff0000,
                        1
                    );
                }
            }
        }

        this.playerPosition.x = Math.floor(gridWidth / 2);
        this.playerPosition.y = gridHeight - 1; 
        const playerX = this.game.canvas.width / 2 - (gridWidth * this.cellSize / 2) + (this.playerPosition.x * this.cellSize) + this.cellSize / 2;
        const playerY = this.game.canvas.height / 2 - (gridHeight * this.cellSize / 2) + (this.playerPosition.y * this.cellSize) + this.cellSize / 2;

        this.player = this.add.rectangle(
            playerX,
            playerY,
            this.cellSize - 2,
            this.cellSize - 2,
            0x00ff00,
            1
        );

        // Setup input keys
        this.input.keyboard?.on('keydown-LEFT', this.moveLeft, this);
        this.input.keyboard?.on('keydown-RIGHT', this.moveRight, this);
        this.input.keyboard?.on('keydown-UP', this.spawn, this);

        EventBus.emit('current-scene-ready', this);
    }

    moveLeft() {
        if (!this.canMove) return;
        if (this.playerPosition.x > 0) {
            this.playerPosition.x -= 1;
            this.updatePlayerPosition();
        }
    }

    moveRight() {
        if (!this.canMove) return;
        if (this.playerPosition.x < WIDTH - 1) {
            this.playerPosition.x += 1;
            this.updatePlayerPosition();
        }
    }

    spawn() {
        if (!this.canMove) return;
        console.log('Spawn function called');
        // call the blockchain here
        this.canMove = false;
    }

    updatePlayerPosition() {
        if (this.player) {
            const playerX = this.game.canvas.width / 2 - (WIDTH * this.cellSize / 2) + (this.playerPosition.x * this.cellSize) + this.cellSize / 2;
            const playerY = this.game.canvas.height / 2 - ( (HEIGHT + 1) * this.cellSize / 2) + (this.playerPosition.y * this.cellSize) + this.cellSize / 2;
            this.player.setPosition(playerX, playerY);
        }
    }

    changeScene () {
        this.scene.start('GameOver');
    }
}

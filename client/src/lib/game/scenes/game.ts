import { EventBus } from '../eventBus';
import { Scene } from 'phaser';
import { testMap, testPlayers } from "$lib/test";
import { HEIGHT, isSet, WIDTH } from "$lib/logic/feltUtils";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera | undefined;
    background: Phaser.GameObjects.Image | undefined;

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
        const cellSize = Math.min(
            this.game.canvas.width / gridWidth, 
            (this.game.canvas.height - (verticalPadding * 2)) / gridHeight
        );

        const grid = this.add.grid(
            this.game.canvas.width / 2,     // x position (center)
            this.game.canvas.height / 2,    // y position (center) 
            gridWidth * cellSize,           // width
            gridHeight * cellSize,          // height
            cellSize,                       // cell width
            cellSize,                       // cell height
            0x000000,                       // fill color
            0,                              // fill alpha
            0xffffff,                       // line color
            1                               // line alpha
        );

        const border = this.add.rectangle(
            this.game.canvas.width / 2,
            this.game.canvas.height / 2,
            gridWidth * cellSize,
            gridHeight * cellSize,
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
                        this.game.canvas.width / 2 - (gridWidth * cellSize / 2) + (row * cellSize) + cellSize / 2,
                        this.game.canvas.height / 2 - (gridHeight * cellSize / 2) + (col * cellSize) + cellSize / 2,
                        cellSize - 2,
                        cellSize - 2,
                        0x000000,
                        1
                    );
                }
                if (isSet(testPlayers, HEIGHT - 1 - col, WIDTH - row)) {
                    this.add.rectangle(
                        this.game.canvas.width / 2 - (gridWidth * cellSize / 2) + (row * cellSize) + cellSize / 2,
                        this.game.canvas.height / 2 - (gridHeight * cellSize / 2) + (col * cellSize) + cellSize / 2,
                        cellSize - 2,
                        cellSize - 2,
                        0xff0000,
                        1
                    );
                }
            }
        }

        EventBus.emit('current-scene-ready', this);
    }

    changeScene () {
        this.scene.start('GameOver');
    }
}
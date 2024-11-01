import { Scene } from 'phaser';
import { Grid } from '../gameComponents/grid';
import { Player } from '../gameComponents/player';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera | undefined;
    background: Phaser.GameObjects.Image | undefined;
    grid: Grid | undefined;
    player: Player | undefined;
    playerPosition: { x: number, y: number } = { x: 0, y: 0 };
    canMove: boolean = true;
    cellSize: number = 50;

    constructor () {
        super('Game');
    }

    create () {
        this.camera = this.cameras.main;

        this.background = this.add.image(0,  this.game.canvas.height * -1, 'ground');
        this.background.setOrigin(0);
        this.background.displayWidth = this.game.canvas.width; 
        this.background.displayHeight = this.game.canvas.height * 2; 

    // Initialize Grid
        this.grid = new Grid(this, this.cellSize);

        // Initialize Player
        this.player = new Player(this, this.cellSize);
    }

    changeScene () {
        this.scene.start('GameOver');
    }
}

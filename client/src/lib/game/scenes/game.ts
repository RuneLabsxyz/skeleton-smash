import { EventBus } from '../eventBus';
import { Scene } from 'phaser';

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

        EventBus.emit('current-scene-ready', this);
    }

    changeScene () {
        this.scene.start('GameOver');
    }
}
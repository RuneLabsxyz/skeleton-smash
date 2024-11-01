import { EventBus } from '../eventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera | undefined;

    constructor () {
        super('GameOver');
    }

    create () {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene () {
        this.scene.start('MainMenu');
    }
}
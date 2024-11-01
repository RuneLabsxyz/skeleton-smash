import { type GameObjects, Scene } from 'phaser';

import { EventBus } from '../eventBus';

export class MainMenu extends Scene {
    background: GameObjects.Image | undefined;

    constructor () {
        super('MainMenu');
    }

    create () {
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0);
        this.background.displayWidth = this.game.canvas.width; 
        this.background.displayHeight = this.game.canvas.height; 

        this.input.keyboard?.on('keydown', (event: KeyboardEvent) => this.changeScene());

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene () {
        this.scene.start('Game');
    }
}
import { Boot } from './scenes/boot';
import { Game as MainGame } from './scenes/game';
import { MainMenu } from './scenes/mainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/preloader';
import { GameOver } from './scenes/gameOver';

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        width: '100%',
        height: '100%'
    },
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver
    ]
};

export const StartGame = (parent: string) => new Game({ ...config, parent });
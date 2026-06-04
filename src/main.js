import Phaser from 'phaser';
import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import NameInputScene from './scenes/NameInputScene.js';
import GameScene from './scenes/GameScene.js';
import EndingScene from './scenes/EndingScene.js';
import GalleryScene from './scenes/GalleryScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  backgroundColor: '#000000',
  scene: [BootScene, MenuScene, NameInputScene, GameScene, EndingScene, GalleryScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);

import Phaser from 'phaser';
import { endings } from '../data/story.js';
import UnlocksManager from '../engine/UnlocksManager.js';

export default class GalleryScene extends Phaser.Scene {
  constructor() {
    super('GalleryScene');
  }

  create() {
    this.cameras.main.fadeIn(400, 0, 0, 0);

    this.add.rectangle(640, 360, 1280, 720, 0x1a1612);

    this.add.text(640, 40, 'RUTAS COMPLETADAS', {
      fontSize: '22px',
      fontFamily: 'Courier New, monospace',
      color: '#c4a574',
    }).setOrigin(0.5);

    this.add.text(640, 68, `${UnlocksManager.count()} / 7`, {
      fontSize: '13px',
      fontFamily: 'Courier New, monospace',
      color: '#6b5a4a',
    }).setOrigin(0.5);

    const keys = Object.keys(endings);
    const cols = 2;
    const cardW = 560;
    const cardH = 120;
    const startX = 640;
    const startY = 140;
    const gapX = 40;
    const gapY = 24;

    keys.forEach((key, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + (col - (cols - 1) / 2) * (cardW + gapX);
      const y = startY + row * (cardH + gapY);

      const unlocked = UnlocksManager.has(key);
      this.createCard(x, y, cardW, cardH, key, unlocked);
    });

    this.createButton(640, 680, 'VOLVER', () => {
      this.scene.start('MenuScene');
    });
  }

  createCard(x, y, w, h, key, unlocked) {
    const ending = endings[key];
    const color = unlocked ? 0x0a0a0a : 0x1a1a1a;
    const borderColor = unlocked ? 0xc4a574 : 0x3a3a3a;
    const textColor = unlocked ? '#c4a574' : '#3a3a3a';

    const bg = this.add.rectangle(x, y, w, h, color, 0.85)
      .setStrokeStyle(1, borderColor);

    if (unlocked) {
      this.add.text(x - w / 2 + 20, y - h / 2 + 16, ending.title, {
        fontSize: '13px',
        fontFamily: 'Courier New, monospace',
        color: textColor,
      });

      this.add.text(x - w / 2 + 20, y + 8, ending.description, {
        fontSize: '11px',
        fontFamily: 'Arial, sans-serif',
        color: '#8a7a5c',
        wordWrap: { width: w - 40 },
      });
    } else {
      this.add.text(x, y, '???', {
        fontSize: '18px',
        fontFamily: 'Courier New, monospace',
        color: '#3a3a3a',
      }).setOrigin(0.5);
    }
  }

  createButton(x, y, label, callback) {
    const bg = this.add.rectangle(x, y, 200, 42, 0x0a0a0a, 0.8)
      .setStrokeStyle(1, 0x4a3a2a)
      .setInteractive({ useHandCursor: true });

    const text = this.add.text(x, y, label, {
      fontSize: '13px',
      fontFamily: 'Courier New, monospace',
      color: '#c4a574',
    }).setOrigin(0.5);

    bg.on('pointerover', () => {
      bg.setFillStyle(0x1a1a2a, 0.9);
      text.setColor('#ffffff');
    });
    bg.on('pointerout', () => {
      bg.setFillStyle(0x0a0a0a, 0.8);
      text.setColor('#c4a574');
    });
    bg.on('pointerup', callback);
  }
}

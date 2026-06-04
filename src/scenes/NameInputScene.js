import Phaser from 'phaser';
import StoryEngine from '../engine/StoryEngine.js';

const MAX_NAME = 16;

export default class NameInputScene extends Phaser.Scene {
  constructor() {
    super('NameInputScene');
  }

  create() {
    this.cameras.main.fadeIn(400, 0, 0, 0);

    this.add.rectangle(640, 360, 1280, 720, 0x1a1612);

    this.add.text(640, 150, 'NUEVA PARTIDA', {
      fontSize: '28px',
      fontFamily: 'Courier New, monospace',
      color: '#c4a574',
    }).setOrigin(0.5);

    this.add.text(640, 205, '\u2014 Zona Costera, 2080 \u2014', {
      fontSize: '12px',
      fontFamily: 'Courier New, monospace',
      color: '#6b5a4a',
    }).setOrigin(0.5);

    this.add.text(640, 300, '\u00BFCU\u00C1L ES TU NOMBRE?', {
      fontSize: '16px',
      fontFamily: 'Courier New, monospace',
      color: '#8a7a5c',
    }).setOrigin(0.5);

    this.add.text(640, 330, 'Se usar\u00E1 en el juego si es posible', {
      fontSize: '11px',
      fontFamily: 'Arial, sans-serif',
      color: '#4a3a2a',
    }).setOrigin(0.5);

    this.name = '';

    this.nameDisplay = this.add.text(640, 400, '\u258C', {
      fontSize: '28px',
      fontFamily: 'Courier New, monospace',
      color: '#ff6b35',
    }).setOrigin(0.5);

    this.blinkEvent = this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        this.nameDisplay.setText(this.name + (this.nameDisplay.text.endsWith('\u258C') ? ' ' : '\u258C'));
      },
    });

    this.infoText = this.add.text(640, 480, 'ENTER = continuar  |  Si est\u00E1 vac\u00EDo: "Contrabandista"', {
      fontSize: '11px',
      fontFamily: 'Arial, sans-serif',
      color: '#4a3a2a',
    }).setOrigin(0.5);

    this.input.keyboard.on('keydown', (event) => {
      if (event.key === 'Enter') {
        this.confirm();
        return;
      }

      if (event.key === 'Backspace') {
        this.name = this.name.slice(0, -1);
        this.updateDisplay();
        return;
      }

      if (this.name.length >= MAX_NAME) return;

      if (event.key.length === 1) {
        this.name += event.key;
        this.updateDisplay();
      }
    });
  }

  updateDisplay() {
    const display = this.name || ' ';
    this.nameDisplay.setText(display + '\u258C');
  }

  confirm() {
    if (this.blinkEvent) this.blinkEvent.remove();
    const name = this.name.trim() || 'Contrabandista';

    const engine = new StoryEngine();
    engine.startNew(name);

    this.cameras.main.fadeOut(400, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene', { engine });
    });
  }
}

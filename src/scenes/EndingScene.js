import Phaser from 'phaser';
import { endings } from '../data/story.js';
import SaveManager from '../engine/SaveManager.js';
import UnlocksManager from '../engine/UnlocksManager.js';
import AudioManager from '../engine/AudioManager.js';

export default class EndingScene extends Phaser.Scene {
  constructor() {
    super('EndingScene');
  }

  init(data) {
    this.endingType = data.endingType || 'c_neutro';
    this.protagonistName = data.protagonistName || 'Contrabandista';
  }

  create() {
    this.cameras.main.fadeIn(800, 0, 0, 0);

    const ending = endings[this.endingType];
    if (!ending) {
      this.scene.start('MenuScene');
      return;
    }

    const bgColors = {
      a_traicion: 0x1a0000,
      a_alterado: 0x0a2a1a,
      a_culpable: 0x2a1a0a,
      b_vendido: 0x1a2a2a,
      b_justo: 0x2a1a0a,
      c_salvador: 0x0a2a1a,
      c_neutro: 0x1a2a0a,
    };

    this.add.rectangle(640, 360, 1280, 720, bgColors[this.endingType] || 0x0a0a0a);

    if (!this.textures.exists('end_grain')) {
      const canvas = this.textures.createCanvas('end_grain', 1280, 720);
      const ctx = canvas.context;
      for (let i = 0; i < 5000; i++) {
        ctx.fillStyle = `rgba(196, 165, 116, ${Math.random() * 0.12})`;
        ctx.fillRect(Math.random() * 1280, Math.random() * 720, 1, 1);
      }
      canvas.refresh();
    }
    this.add.image(640, 360, 'end_grain').setAlpha(0.3);

    if (!this.textures.exists('end_vignette')) {
      const c = this.textures.createCanvas('end_vignette', 1280, 720);
      const ctx = c.context;
      const grd = ctx.createRadialGradient(640, 360, 200, 640, 360, 480);
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 1280, 720);
      c.refresh();
    }
    this.add.image(640, 360, 'end_vignette');

    this.add.text(640, 40, ending.title, {
      fontSize: '24px',
      fontFamily: 'Courier New, monospace',
      color: '#c4a574',
    }).setOrigin(0.5);

    this.add.rectangle(640, 70, 320, 1, 0x4a3a2a, 0.5);

    let text = ending.text;
    if (this.protagonistName) {
      text = text.replace(/\{nombre\}/g, this.protagonistName);
    }

    const textBlock = this.add.text(100, 100, text, {
      fontSize: '15px',
      fontFamily: 'Georgia, serif',
      color: '#d4c8b8',
      lineSpacing: 6,
      wordWrap: { width: 1080 },
    });

    textBlock.setAlpha(0);
    this.tweens.add({
      targets: textBlock,
      alpha: 1,
      duration: 1500,
      ease: 'Power2',
    });

    const btnBg = this.add.rectangle(640, 660, 320, 46, 0x0a0a0a, 0.85)
      .setStrokeStyle(1, 0x4a3a2a)
      .setInteractive({ useHandCursor: true });

    const btnText = this.add.text(640, 660, 'VOLVER AL MEN\u00DA', {
      fontSize: '13px',
      fontFamily: 'Courier New, monospace',
      color: '#c4a574',
    }).setOrigin(0.5);

    btnBg.setAlpha(0);
    btnText.setAlpha(0);

    this.time.delayedCall(1000, () => {
      this.tweens.add({
        targets: [btnBg, btnText],
        alpha: 1,
        duration: 500,
      });
    });

    btnBg.on('pointerover', () => {
      btnBg.setFillStyle(0x1a1a1a, 0.9);
      btnBg.setStrokeStyle(1, 0xff6b35);
      btnText.setColor('#ffffff');
    });
    btnBg.on('pointerout', () => {
      btnBg.setFillStyle(0x0a0a0a, 0.85);
      btnBg.setStrokeStyle(1, 0x4a3a2a);
      btnText.setColor('#c4a574');
    });
    btnBg.on('pointerup', () => {
      UnlocksManager.add(this.endingType);
      AudioManager.stopMusic(this);
      SaveManager.delete();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('MenuScene');
      });
    });
  }
}

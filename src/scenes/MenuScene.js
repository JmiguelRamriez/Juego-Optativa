import Phaser from 'phaser';
import SaveManager from '../engine/SaveManager.js';
import StoryEngine from '../engine/StoryEngine.js';
import AudioManager from '../engine/AudioManager.js';
import UnlocksManager from '../engine/UnlocksManager.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);

    if (this.textures.exists('menu_bg')) {
      this.add.image(640, 360, 'menu_bg').setDisplaySize(1280, 720).setAlpha(0.7);
    }
    this.add.rectangle(640, 360, 1280, 720, 0x1a1612, 0.35);

    this.createGrain();
    this.createVignette();
    this.addCables();

    AudioManager.playMusic(this, 'musica_menu');

    const title = this.add.text(640, 145, 'Nueva Tenochtitl\u00E1n', {
      fontSize: '68px',
      fontFamily: '"Planet Kosmos", "Courier New", monospace',
      color: '#c4a574',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      alpha: 0.6,
      duration: 2500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.add.text(640, 215, '\u2014 Novela Visual \u2014', {
      fontSize: '13px',
      fontFamily: 'Courier New, monospace',
      color: '#6b5a4a',
    }).setOrigin(0.5);

    this.add.text(640, 250, 'Zona Costera, 2080', {
      fontSize: '11px',
      fontFamily: 'Arial, sans-serif',
      color: '#4a3a2a',
    }).setOrigin(0.5);

    this.createButton(640, 330, 'NUEVA PARTIDA', () => {
      AudioManager.stopMusic(this);
      this.scene.start('NameInputScene');
    }, false, '#ff6b35');

    const hasSave = SaveManager.hasSave();
    this.createButton(640, 395, 'CARGAR PARTIDA', () => {
      this.loadGame();
    }, !hasSave, '#c9a96e');

    if (hasSave) {
      const saveData = SaveManager.load();
      if (saveData) {
        const playerName = saveData.protagonistName || '\u2014';
        this.add.text(640, 440, `[ ${playerName} ]   Ruta ${saveData.route || '?'}`, {
          fontSize: '11px',
          fontFamily: 'Courier New, monospace',
          color: '#4a4a5a',
        }).setOrigin(0.5);
      }
    }

    const unlockedCount = UnlocksManager.count();
    this.createButton(640, 465, `RUTAS (${unlockedCount}/7)`, () => {
      this.scene.start('GalleryScene');
    }, false, '#6ba3c9');

    // ── empieza de cero ──────────────────────────
    if (hasSave) {
      this.createButton(640, 530, 'EMPEZAR DE CERO', () => {
        this.showResetConfirm();
      }, false, '#7a4a4a');
    }

    this.add.text(640, 690, 'Hac\u00E9 clic para avanzar. Tus decisiones cambian la historia.', {
      fontSize: '10px',
      fontFamily: 'Arial, sans-serif',
      color: '#3a2a1a',
    }).setOrigin(0.5);

    const neonLine = this.add.rectangle(640, 285, 380, 1, 0xff6b35, 0.3);
    this.tweens.add({
      targets: neonLine,
      alpha: 0.8,
      duration: 100 + Math.random() * 200,
      yoyo: true,
      repeat: -1,
    });

    this.createMuteButton();

    this.events.on('shutdown', () => {
      AudioManager.stopMusic(this);
    });
  }

  createMuteButton() {
    const muted = AudioManager.getMuted();
    const label = muted ? '\u{1F507}' : '\u{1F50A}';
    const btn = this.add.text(1240, 8, label, {
      fontSize: '16px',
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true }).setAlpha(0.75);

    btn.on('pointerover', () => btn.setAlpha(1));
    btn.on('pointerout', () => btn.setAlpha(0.75));
    btn.on('pointerup', () => {
      const newMuted = !AudioManager.getMuted();
      AudioManager.setMuted(newMuted);
      this.sound.mute = newMuted;
      btn.setText(newMuted ? '\u{1F507}' : '\u{1F50A}');
    });
  }

  createGrain() {
    if (!this.textures.exists('menu_grain')) {
      const canvas = this.textures.createCanvas('menu_grain', 1280, 720);
      const ctx = canvas.context;
      for (let i = 0; i < 5000; i++) {
        ctx.fillStyle = `rgba(196, 165, 116, ${Math.random() * 0.15})`;
        ctx.fillRect(Math.random() * 1280, Math.random() * 720, 1, 1);
      }
      canvas.refresh();
    }
    this.add.image(640, 360, 'menu_grain').setAlpha(0.6);
  }

  createVignette() {
    if (!this.textures.exists('menu_vignette')) {
      const c = this.textures.createCanvas('menu_vignette', 1280, 720);
      const ctx = c.context;
      const grd = ctx.createRadialGradient(640, 360, 250, 640, 360, 480);
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(1, 'rgba(0,0,0,0.6)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 1280, 720);
      c.refresh();
    }
    this.add.image(640, 360, 'menu_vignette');
  }

  addCables() {
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x4a3a2a, 0.3);
    graphics.beginPath();
    graphics.moveTo(0, 100);
    graphics.lineTo(160, 80);
    graphics.lineTo(260, 120);
    graphics.strokePath();
    graphics.beginPath();
    graphics.moveTo(1280, 600);
    graphics.lineTo(1100, 620);
    graphics.lineTo(1000, 580);
    graphics.strokePath();
  }

  createButton(x, y, label, callback, disabled = false, accentColor = '#c9a96e') {
    const bg = this.add.rectangle(x, y, 380, 46, disabled ? 0x2a2a2a : 0x0a0a0a, disabled ? 0.5 : 0.8)
      .setStrokeStyle(1, disabled ? 0x3a3a3a : Phaser.Display.Color.HexStringToColor(accentColor).color)
      .setInteractive({ useHandCursor: !disabled });

    const text = this.add.text(x, y, label, {
      fontSize: '14px',
      fontFamily: 'Courier New, monospace',
      color: disabled ? '#4a4a4a' : accentColor,
    }).setOrigin(0.5);

    if (!disabled) {
      bg.on('pointerover', () => {
        bg.setFillStyle(0x1a1a2a, 0.9);
        text.setColor('#ffffff');
      });
      bg.on('pointerout', () => {
        bg.setFillStyle(0x0a0a0a, 0.8);
        text.setColor(accentColor);
      });
      bg.on('pointerdown', () => {
        bg.setFillStyle(0x2a2a3a, 0.9);
      });
      bg.on('pointerup', callback);
    }

    return { bg, text };
  }

  showResetConfirm() {
    const overlay = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.7).setDepth(100).setInteractive();
    const box = this.add.rectangle(640, 360, 380, 160, 0x0a0a0a, 0.95).setStrokeStyle(1, 0x4a3a2a).setDepth(101);
    const msg = this.add.text(640, 330, '\u00BFBorrar partida y empezar de cero?', {
      fontSize: '12px',
      fontFamily: 'Courier New, monospace',
      color: '#c4a574',
      align: 'center',
    }).setOrigin(0.5).setDepth(102);
    const sub = this.add.text(640, 355, 'Se perder\u00E1 el progreso guardado.', {
      fontSize: '10px',
      fontFamily: 'Arial, sans-serif',
      color: '#7a4a4a',
    }).setOrigin(0.5).setDepth(102);

    const confirmBtn = this.add.rectangle(540, 410, 130, 36, 0x1a1a1a, 0.9)
      .setStrokeStyle(1, 0x7a4a4a).setDepth(102).setInteractive({ useHandCursor: true });
    const confirmTxt = this.add.text(540, 410, 'BORRAR', {
      fontSize: '12px',
      fontFamily: 'Courier New, monospace',
      color: '#7a4a4a',
    }).setOrigin(0.5).setDepth(103);

    const cancelBtn = this.add.rectangle(740, 410, 130, 36, 0x1a1a1a, 0.9)
      .setStrokeStyle(1, 0x3a3a3a).setDepth(102).setInteractive({ useHandCursor: true });
    const cancelTxt = this.add.text(740, 410, 'CANCELAR', {
      fontSize: '12px',
      fontFamily: 'Courier New, monospace',
      color: '#8a7a5c',
    }).setOrigin(0.5).setDepth(103);

    const destroy = () => {
      overlay.destroy(); box.destroy(); msg.destroy(); sub.destroy();
      confirmBtn.destroy(); confirmTxt.destroy(); cancelBtn.destroy(); cancelTxt.destroy();
    };

    confirmBtn.on('pointerup', () => {
      AudioManager.stopMusic(this);
      SaveManager.delete();
      localStorage.removeItem('protagonist_name');
      destroy();
      this.scene.start('NameInputScene');
    });
    cancelBtn.on('pointerup', destroy);
    overlay.on('pointerup', destroy);
  }

  loadGame() {
    if (!SaveManager.hasSave()) return;
    AudioManager.stopMusic(this);
    const engine = StoryEngine.loadGame();
    if (engine) {
      this.scene.start('GameScene', { engine });
    }
  }
}

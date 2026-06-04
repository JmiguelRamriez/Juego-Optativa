import Phaser from 'phaser';
import { characters } from '../data/story.js';
import AudioManager from '../engine/AudioManager.js';

const BOX_BOTTOM = 700;
const BOX_MIN_H = 120;
const BOX_MAX_H = 380;
const TEXT_X = 80;
const TEXT_W = 1100;
const NAME_X = 80;
const BOX_PAD_TOP = 42;
const NAME_PAD_TOP = 6;

const SPEAKER_CHAR = {
  'Martín': 'char_martin',
  'Valeria': 'char_valeria',
  'Raúl': 'char_raul',
  'María': 'char_maria',
  'Agente': 'char_agente',
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.engine = data.engine;
    if (!this.engine) {
      this.scene.start('MenuScene');
      return;
    }
    this.lineIndex = 0;
    this.isTyping = false;
    this.showingChoices = false;
    this.canAdvance = false;
    this.transitioning = false;
    this.choiceButtons = [];
    this.node = this.engine.getNodeData();
    this.currentSpeaker = null;
    this.lastCharKey = null;
  }

  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);

    // ── layers z: 0 ───────────────────────────
    this.bgRect = this.add.rectangle(640, 360, 1280, 720, 0x000000);
    this.bgImage = this.add.image(640, 360, '').setVisible(false);

    // ── layers z: 1 (overlays) ────────────────
    if (!this.textures.exists('game_grain')) {
      const canvas = this.textures.createCanvas('game_grain', 1280, 720);
      const ctx = canvas.context;
      for (let i = 0; i < 5000; i++) {
        ctx.fillStyle = `rgba(196, 165, 116, ${Math.random() * 0.12})`;
        ctx.fillRect(Math.random() * 1280, Math.random() * 720, 1, 1);
      }
      canvas.refresh();
    }
    this.grainOverlay = this.add.image(640, 360, 'game_grain').setAlpha(0.4);

    if (!this.textures.exists('game_vignette')) {
      const c = this.textures.createCanvas('game_vignette', 1280, 720);
      const ctx = c.context;
      const grd = ctx.createRadialGradient(640, 360, 250, 640, 360, 520);
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, 1280, 720);
      c.refresh();
    }
    this.add.image(640, 360, 'game_vignette');

    // ── layers z: 2 (character, sobre overlays) ─
    this.charSprite = this.add.image(640, 720, '').setOrigin(0.5, 1).setAlpha(0).setVisible(false);

    // ── layers z: 3 (decoración) ────────────
    this.cableGraphics = this.add.graphics();

    // ── layers z: 4 (HUD) ──────────────────
    this.sceneTitle = this.add.text(640, 16, '', {
      fontSize: '11px',
      fontFamily: 'Courier New, monospace',
      color: '#8a7a5c',
    }).setOrigin(0.5);

    this.hudName = this.add.text(15, 700, '', {
      fontSize: '10px',
      fontFamily: 'Courier New, monospace',
      color: '#8a7a5c',
    });

    // ── layers z: 5 (diálogo) ─────────────
    this.dialogueBox = this.add.rectangle(640, 540, 1200, 320, 0x0a0a0a, 0.85)
      .setStrokeStyle(1, 0x3a2a1a);

    this.nameBox = this.add.rectangle(0, 0, 0, 0, 0x0a0a0a, 0);
    this.nameText = this.add.text(0, 0, '', {
      fontSize: '14px',
      fontFamily: 'Courier New, monospace',
      color: '#ffffff',
    });

    this.dialogueText = this.add.text(TEXT_X, 460, '', {
      fontSize: '16px',
      fontFamily: 'Georgia, serif',
      color: '#d4c8b8',
      wordWrap: { width: TEXT_W },
      lineSpacing: 5,
    });

    this.continueIndicator = this.add.text(1240, 680, '\u25BC', {
      fontSize: '14px',
      fontFamily: 'Arial, sans-serif',
      color: '#ff6b35',
    }).setOrigin(0.5).setAlpha(0);

    // ── layers z: 6 (botones) ─────────────
    this.input.on('pointerdown', () => this.handleClick());

    this.skipBtn = this.add.text(1260, 8, 'SALTAR >>', {
      fontSize: '11px',
      fontFamily: 'Courier New, monospace',
      color: '#c4a574',
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true }).setAlpha(0.75);
    this.skipBtn.on('pointerover', () => this.skipBtn.setAlpha(1));
    this.skipBtn.on('pointerout', () => this.skipBtn.setAlpha(0.75));
    this.skipBtn.on('pointerup', () => this.skipDialogue());

    this.saveBtn = this.add.text(1150, 8, '\u{1F4BE}', {
      fontSize: '16px',
      color: '#c4a574',
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true }).setAlpha(0.75);
    this.saveBtn.on('pointerover', () => this.saveBtn.setAlpha(1));
    this.saveBtn.on('pointerout', () => this.saveBtn.setAlpha(0.75));
    this.saveBtn.on('pointerup', () => this.doSave());

    this.menuBtn = this.add.text(1050, 8, 'MENU', {
      fontSize: '11px',
      fontFamily: 'Courier New, monospace',
      color: '#c4a574',
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true }).setAlpha(0.75);
    this.menuBtn.on('pointerover', () => this.menuBtn.setAlpha(1));
    this.menuBtn.on('pointerout', () => this.menuBtn.setAlpha(0.75));
    this.menuBtn.on('pointerup', () => this.goToMenu());

    this.muteBtn = this.add.text(1240, 8, '', {
      fontSize: '16px',
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true }).setAlpha(0.75);
    this.updateMuteBtn();
    this.muteBtn.on('pointerover', () => this.muteBtn.setAlpha(1));
    this.muteBtn.on('pointerout', () => this.muteBtn.setAlpha(0.75));
    this.muteBtn.on('pointerup', () => {
      const newMuted = !AudioManager.getMuted();
      AudioManager.setMuted(newMuted);
      this.sound.mute = newMuted;
      this.updateMuteBtn();
    });

    this.routeLabel = this.add.text(35, 710, '', {
      fontSize: '10px',
      fontFamily: 'Courier New, monospace',
      color: '#8a7a5c',
    });

    this.savedLabel = this.add.text(640, 690, '', {
      fontSize: '11px',
      fontFamily: 'Courier New, monospace',
      color: '#8a7a5c',
    }).setOrigin(0.5).setAlpha(0);

    this.loadNode();

    AudioManager.playMusic(this, 'musica_juego');

    this.events.on('shutdown', () => {
      AudioManager.stopMusic(this);
    });
  }

  updateMuteBtn() {
    if (!this.muteBtn) return;
    const muted = AudioManager.getMuted();
    this.muteBtn.setText(muted ? '\u{1F507}' : '\u{1F50A}');
    this.sound.mute = muted;
  }

  setBackground(bg) {
    if (typeof bg === 'number') {
      this.bgImage.setVisible(false);
      this.bgRect.setFillStyle(bg, 1).setVisible(true);
    } else if (typeof bg === 'string' && this.textures.exists(bg)) {
      this.bgImage.setTexture(bg).setDisplaySize(1280, 720).setVisible(true);
      this.bgRect.setVisible(false);
    } else {
      this.bgImage.setVisible(false);
      this.bgRect.setFillStyle(0x1a1612, 1).setVisible(true);
    }
  }

  setSpeaker(speaker) {
    const key = speaker ? SPEAKER_CHAR[speaker] : null;
    if (key && key !== this.lastCharKey && this.textures.exists(key)) {
      const tex = this.textures.get(key);
      const scale = 600 / tex.getSourceImage().height;
      this.charSprite.setTexture(key).setScale(scale);
      this.charSprite.setVisible(true);
      this.tweens.killTweensOf(this.charSprite);
      this.charSprite.setAlpha(0);
      this.tweens.add({ targets: this.charSprite, alpha: 0.95, duration: 300, ease: 'Sine.easeInOut' });
      this.lastCharKey = key;
    } else if (!key) {
      if (this.lastCharKey) {
        this.tweens.killTweensOf(this.charSprite);
        this.tweens.add({
          targets: this.charSprite,
          alpha: 0,
          duration: 200,
          ease: 'Sine.easeInOut',
          onComplete: () => { this.charSprite.setVisible(false); this.lastCharKey = null; },
        });
      }
    }
  }

  resizeBox(textHeight, hasSpeaker) {
    const pad = hasSpeaker ? 55 : 38;
    let targetH = textHeight + pad;
    targetH = Phaser.Math.Clamp(targetH, BOX_MIN_H, BOX_MAX_H);
    const newY = BOX_BOTTOM - targetH / 2;
    const boxTop = BOX_BOTTOM - targetH;

    this.dialogueText.setY(boxTop + BOX_PAD_TOP);
    this.nameBox.setY(boxTop + NAME_PAD_TOP + 12);
    this.nameText.setY(boxTop + NAME_PAD_TOP + 5);

    this.tweens.killTweensOf(this.dialogueBox);
    this.tweens.add({
      targets: this.dialogueBox,
      y: newY,
      displayHeight: targetH,
      duration: 200,
      ease: 'Sine.easeInOut',
    });
  }

  loadNode() {
    this.node = this.engine.getNodeData();
    if (!this.node) {
      this.scene.start('MenuScene');
      return;
    }

    this.setBackground(this.node.bg);
    this.sceneTitle.setText(this.node.scene || '');
    this.lineIndex = 0;
    this.showingChoices = false;
    this.canAdvance = false;
    this.currentSpeaker = null;
    this.lastCharKey = null;
    this.charSprite.setAlpha(0).setVisible(false);

    this.clearChoices();
    this.drawCables();

    const route = this.engine.route;
    if (route) this.routeLabel.setText(`RUTA ${route}`);
    const pName = this.engine.protagonistName || 'Contrabandista';
    this.hudName.setText(`CONTRABANDISTA: ${pName}`);

    this.showLine();
  }

  drawCables() {
    this.cableGraphics.clear();
    this.cableGraphics.lineStyle(1, 0x6b5a4a, 0.25);
    this.cableGraphics.beginPath();
    this.cableGraphics.moveTo(0, 660);
    this.cableGraphics.lineTo(100, 640);
    this.cableGraphics.lineTo(160, 660);
    this.cableGraphics.strokePath();
  }

  showLine() {
    const lines = this.node.lines;
    if (!lines || this.lineIndex >= lines.length) {
      if (this.node.choices && this.node.choices.length > 0) {
        this.showChoices();
      }
      return;
    }

    const line = lines[this.lineIndex];
    const speaker = line.speaker;

    this.setSpeaker(speaker);

    if (speaker && characters[speaker]) {
      const ch = characters[speaker];
      this.nameText.setText(ch.label).setColor(ch.color);
      const nameWidth = Math.max(this.nameText.width + 30, 110);
      this.nameBox.setSize(nameWidth, 22).setFillStyle(0x0a0a0a, 0.9).setVisible(true);
      this.nameBox.setX(NAME_X + nameWidth / 2);
      this.nameText.setX(NAME_X + 15).setVisible(true);
    } else {
      this.nameText.setVisible(false);
      this.nameBox.setVisible(false);
    }

    const formattedText = this.engine.formatLine(line.text);

    const tempH = this.measureTextHeight(formattedText);
    this.resizeBox(tempH, !!speaker);

    this.typewrite(formattedText);
  }

  measureTextHeight(text) {
    const temp = this.add.text(-5000, 0, text, {
      fontSize: '16px',
      fontFamily: 'Georgia, serif',
      wordWrap: { width: TEXT_W },
      lineSpacing: 5,
    });
    const h = temp.height;
    temp.destroy();
    return h;
  }

  typewrite(fullText) {
    this.isTyping = true;
    this.canAdvance = false;
    this.continueIndicator.setAlpha(0);
    this.dialogueText.setText('');

    if (this.typewriterEvent) this.typewriterEvent.remove();

    let i = 0;
    this.typewriterEvent = this.time.addEvent({
      delay: 28,
      callback: () => {
        i++;
        this.dialogueText.setText(fullText.substring(0, i));
        if (i >= fullText.length) {
          this.typewriterEvent.remove();
          this.isTyping = false;
          this.canAdvance = true;
          this.blinkContinue();
        }
      },
      repeat: fullText.length - 1,
    });
  }

  blinkContinue() {
    this.continueIndicator.setAlpha(1);
    if (this.continueTween) this.continueTween.remove();
    this.continueTween = this.tweens.add({
      targets: this.continueIndicator,
      alpha: 0.1,
      duration: 600,
      yoyo: true,
      repeat: -1,
    });
  }

  handleClick() {
    if (this.transitioning) return;
    if (this.showingChoices) return;

    if (this.isTyping) {
      this.skipTypewrite();
      return;
    }

    if (this.node.ending) {
      this.goToEnding();
      return;
    }

    const lines = this.node.lines;
    if (lines && this.lineIndex < lines.length - 1) {
      this.lineIndex++;
      this.showLine();
    } else if (this.node.choices && this.node.choices.length > 0) {
      this.showChoices();
    }
  }

  skipTypewrite() {
    if (this.typewriterEvent) this.typewriterEvent.remove();
    this.isTyping = false;
    this.canAdvance = true;

    const lines = this.node.lines;
    if (lines && this.lineIndex < lines.length) {
      const formatted = this.engine.formatLine(lines[this.lineIndex].text);
      this.dialogueText.setText(formatted);
    }

    this.blinkContinue();
  }

  skipDialogue() {
    if (this.transitioning || this.showingChoices) return;

    if (this.isTyping) {
      if (this.typewriterEvent) this.typewriterEvent.remove();
      this.isTyping = false;
      const formatted = this.engine.formatLine(this.node.lines[this.lineIndex].text);
      this.dialogueText.setText(formatted);
    }

    this.lineIndex = this.node.lines.length;
    this.canAdvance = true;
    this.continueIndicator.setAlpha(0);

    if (this.node.ending) {
      this.goToEnding();
    } else if (this.node.choices && this.node.choices.length > 0) {
      this.showChoices();
    }
  }

  showChoices() {
    this.showingChoices = true;
    this.canAdvance = false;
    this.continueIndicator.setAlpha(0);

    this.nameText.setVisible(false);
    this.nameBox.setVisible(false);

    const choices = this.node.choices;
    if (!choices || choices.length === 0) return;

    this.dialogueText.setText('');

    const startY = 280 - (choices.length * 30);

    choices.forEach((choice, i) => {
      const y = startY + i * 60;

      const bg = this.add.rectangle(640, y, 640, 46, 0x0a0a0a, 0.85)
        .setStrokeStyle(1, 0x4a3a2a)
        .setInteractive({ useHandCursor: true });

      const label = this.add.text(640, y, choice.text, {
        fontSize: '14px',
        fontFamily: 'Courier New, monospace',
        color: '#c4a574',
        align: 'center',
        wordWrap: { width: 600 },
      }).setOrigin(0.5);

      bg.on('pointerover', () => {
        if (!this.transitioning) {
          bg.setFillStyle(0x1a1a1a, 0.9);
          bg.setStrokeStyle(1, 0xff6b35);
          label.setColor('#ffffff');
        }
      });
      bg.on('pointerout', () => {
        bg.setFillStyle(0x0a0a0a, 0.85);
        bg.setStrokeStyle(1, 0x4a3a2a);
        label.setColor('#c4a574');
      });
      bg.on('pointerup', () => {
        if (!this.transitioning) this.onChoice(i);
      });

      bg.setAlpha(0);
      label.setAlpha(0);
      this.tweens.add({
        targets: [bg, label],
        alpha: 1,
        duration: 300,
        delay: i * 120,
      });

      this.choiceButtons.push({ bg, label });
    });
  }

  clearChoices() {
    this.choiceButtons.forEach(({ bg, label }) => {
      bg.destroy();
      label.destroy();
    });
    this.choiceButtons = [];
  }

  onChoice(index) {
    if (this.transitioning) return;

    const choice = this.node.choices[index];

    this.choiceButtons.forEach(({ bg, label }, i) => {
      if (i === index) {
        bg.setFillStyle(0x1a3a1a, 0.9);
        bg.setStrokeStyle(1, 0x6ba3c9);
        label.setColor('#8fbc8f');
      } else {
        bg.setAlpha(0.3);
        label.setAlpha(0.3);
      }
    });

    this.time.delayedCall(280, () => {
      this.transitioning = true;
      this.clearChoices();
      this.showingChoices = false;
      this.engine.makeChoice(index);

      this.cameras.main.fadeOut(400, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.transitioning = false;
        this.lineIndex = 0;
        this.node = this.engine.getNodeData();
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.loadNode();
      });
    });
  }

  goToEnding() {
    this.transitioning = true;
    this.cameras.main.fadeOut(600, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('EndingScene', {
        endingType: this.node.endingType,
        protagonistName: this.engine.protagonistName,
      });
    });
  }

  doSave() {
    const saved = this.engine.manualSave();
    if (saved) {
      this.savedLabel.setText('\u2713 GUARDADO').setAlpha(1).setColor('#8a7a5c');
    } else {
      this.savedLabel.setText('\u2717 ERROR').setAlpha(1).setColor('#7a4a4a');
    }
    this.tweens.add({
      targets: this.savedLabel,
      alpha: 0,
      duration: 800,
      delay: 1500,
    });
  }

  goToMenu() {
    if (this.transitioning) return;
    this.transitioning = true;
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MenuScene');
    });
  }
}

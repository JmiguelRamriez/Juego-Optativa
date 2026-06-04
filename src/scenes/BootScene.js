import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.add.rectangle(640, 360, 1280, 720, 0x1a1612);

    this.add.text(640, 280, 'CARGANDO...', {
      fontSize: '16px',
      fontFamily: 'Courier New, monospace',
      color: '#c4a574',
    }).setOrigin(0.5);

    const barBg = this.add.rectangle(640, 340, 360, 16, 0x0a0a0a).setStrokeStyle(1, 0x3a2a1a);
    const barFill = this.add.rectangle(460, 340, 0, 10, 0xc4a574).setOrigin(0, 0.5);

    this.load.on('progress', (v) => {
      barFill.width = 360 * v;
    });

    this.load.image('bg_mercado', 'assets/scenes/bg_mercado.png');
    this.load.image('bg_departamento', 'assets/scenes/bg_departamento.png');
    this.load.image('bg_almacen', 'assets/scenes/bg_almacen.png');
    this.load.image('bg_accion', 'assets/scenes/bg_accion.png');
    this.load.image('bg_palacio', 'assets/scenes/bg_palacio.png');
    this.load.image('bg_postgolpe', 'assets/scenes/bg_postgolpe.png');
    this.load.image('bg_nt_ideal', 'assets/scenes/bg_nt_ideal.png');

    this.load.image('char_martin', 'assets/characters/martin.png');
    this.load.image('char_valeria', 'assets/characters/valeria.png');
    this.load.image('char_raul', 'assets/characters/raul.png');
    this.load.image('char_maria', 'assets/characters/maria.png');
    this.load.image('char_agente', 'assets/characters/agente.png');

    this.load.image('menu_bg', 'assets/menu_bg.png');

    this.load.audio('musica_menu', 'assets/audio/musica_menu.mp3');
    this.load.audio('musica_juego', 'assets/audio/musica_juego.mp3');
  }

  create() {
    this.scene.start('MenuScene');
  }
}

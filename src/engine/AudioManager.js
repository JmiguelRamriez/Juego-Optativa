const MUTE_KEY = 'audio_muted';

export default class AudioManager {
  static getMuted() {
    return localStorage.getItem(MUTE_KEY) === 'true';
  }

  static setMuted(value) {
    localStorage.setItem(MUTE_KEY, value ? 'true' : 'false');
  }

  static applyMute(scene) {
    scene.sound.mute = this.getMuted();
  }

  static playMusic(scene, key, { volume = 0.4, loop = true } = {}) {
    this.applyMute(scene);
    if (scene.musicInstance) {
      scene.musicInstance.stop();
      scene.musicInstance.destroy();
    }
    scene.musicInstance = scene.sound.add(key, { volume, loop });
    scene.musicInstance.play();
    return scene.musicInstance;
  }

  static stopMusic(scene) {
    if (scene.musicInstance) {
      scene.musicInstance.stop();
      scene.musicInstance.destroy();
      scene.musicInstance = null;
    }
  }
}

const SAVE_KEY = 'expansion_canon_save';

export default class SaveManager {
  static save(data) {
    try {
      const saveData = {
        ...data,
        _timestamp: Date.now(),
        _version: 1,
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      return true;
    } catch (e) {
      console.error('Error al guardar:', e);
      return false;
    }
  }

  static load() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error al cargar:', e);
      return null;
    }
  }

  static hasSave() {
    return localStorage.getItem(SAVE_KEY) !== null;
  }

  static delete() {
    localStorage.removeItem(SAVE_KEY);
  }
}

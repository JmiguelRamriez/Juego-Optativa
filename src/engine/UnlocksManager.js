const UNLOCKS_KEY = 'expansion_canon_unlocks';

export default class UnlocksManager {
  static getAll() {
    try {
      const raw = localStorage.getItem(UNLOCKS_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  static add(endingType) {
    if (!endingType) return false;
    const list = this.getAll();
    if (!list.includes(endingType)) {
      list.push(endingType);
      localStorage.setItem(UNLOCKS_KEY, JSON.stringify(list));
      return true;
    }
    return false;
  }

  static has(endingType) {
    return this.getAll().includes(endingType);
  }

  static count() {
    return this.getAll().length;
  }

  static clear() {
    localStorage.removeItem(UNLOCKS_KEY);
  }
}

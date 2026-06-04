import { story } from '../data/story.js';
import SaveManager from './SaveManager.js';

export default class StoryEngine {
  constructor() {
    this.reset();
  }

  reset() {
    this.currentNode = 'start';
    this.route = null;
    this.flags = {};
    this.history = [];
    this.protagonistName = this.getDefaultName();
  }

  getDefaultName() {
    return localStorage.getItem('protagonist_name') || 'Contrabandista';
  }

  setProtagonistName(name) {
    this.protagonistName = name.trim() || 'Contrabandista';
    localStorage.setItem('protagonist_name', this.protagonistName);
  }

  startNew(name) {
    this.reset();
    this.setProtagonistName(name);
    SaveManager.delete();
    return this.getNodeData();
  }

  loadFromSave(saveData) {
    this.currentNode = saveData.currentNode;
    this.route = saveData.route;
    this.flags = saveData.flags || {};
    this.history = saveData.history || [];
    this.protagonistName = saveData.protagonistName || this.getDefaultName();
    return this.getNodeData();
  }

  getNodeData() {
    const node = story[this.currentNode];
    if (!node) {
      console.error(`Nodo no encontrado: ${this.currentNode}`);
      return null;
    }
    return node;
  }

  formatLine(text) {
    return text.replace(/\{nombre\}/g, this.protagonistName);
  }

  makeChoice(choiceIndex) {
    const node = story[this.currentNode];
    if (!node || !node.choices || !node.choices[choiceIndex]) return null;

    const choice = node.choices[choiceIndex];

    if (choice.route) {
      this.route = choice.route;
    }

    if (choice.setFlags) {
      Object.assign(this.flags, choice.setFlags);
    }

    this.history.push({
      node: this.currentNode,
      choice: choiceIndex,
      choiceText: choice.text,
    });

    this.currentNode = choice.nextNode;

    this.autoSave();

    return this.getNodeData();
  }

  autoSave() {
    SaveManager.save(this.getSaveData());
  }

  manualSave() {
    const data = this.getSaveData();
    const saved = SaveManager.save(data);
    return saved;
  }

  getSaveData() {
    return {
      currentNode: this.currentNode,
      route: this.route,
      flags: this.flags,
      history: this.history,
      protagonistName: this.protagonistName,
    };
  }

  static loadGame() {
    const data = SaveManager.load();
    if (!data) return null;
    const engine = new StoryEngine();
    engine.loadFromSave(data);
    return engine;
  }

  isEnding() {
    const node = story[this.currentNode];
    return node && node.ending;
  }
}

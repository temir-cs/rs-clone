import * as Phaser from 'phaser';
import TRAPS_TYPES from '../types/trapsTypes';
import Trap from '../entities/Trap';

class Traps extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  getTypes() {
    return TRAPS_TYPES;
  }

  update() {
    this.children.entries.forEach((trap) => {
      trap.update();
    });
  }
}

export default Traps;

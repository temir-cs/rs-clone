import * as Phaser from 'phaser';
import TRAPS_TYPES from '../types/trapsTypes';
import { TrapsTypesInterface } from '../interfaces/interfaces';

class Traps extends Phaser.GameObjects.Group {
  types: TrapsTypesInterface;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.types = TRAPS_TYPES;
  }

  getTypes(): TrapsTypesInterface {
    return this.types;
  }

  update():void {
    this.children.entries.forEach((trap) => {
      trap.update();
    });
  }
}

export default Traps;

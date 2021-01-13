import * as Phaser from 'phaser';

import ENEMY_TYPES from '../types/types';

import collidable from '../mixins/collidable';

class Enemies extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);

    Object.assign(this, collidable);
  }

  // eslint-disable-next-line class-methods-use-this
  getTypes() {
    return ENEMY_TYPES;
  }
}

export default Enemies;

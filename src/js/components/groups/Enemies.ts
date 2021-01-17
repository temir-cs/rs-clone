import * as Phaser from 'phaser';
import ENEMY_TYPES from '../types/types';
import Enemy from '../entities/Enemy';
import collidable from '../mixins/collidable';

class Enemies extends Phaser.GameObjects.Group {
  constructor(scene: Phaser.Scene) {
    super(scene);

    Object.assign(this, collidable);
  }

  getProjectiles() {
    const projectiles = new Phaser.GameObjects.Group(this.scene);
    const enemies = this.getChildren();
    enemies.forEach((enemy: Enemy) => {
      if (enemy.projectiles) {
        projectiles.addMultiple(enemy.projectiles.getChildren());
      }
    });

    return projectiles;
  }

  // eslint-disable-next-line class-methods-use-this
  getTypes() {
    return ENEMY_TYPES;
  }
}

export default Enemies;

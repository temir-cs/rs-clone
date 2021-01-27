import * as Phaser from 'phaser';
import ENEMY_TYPES from '../types/types';
import Enemy from '../entities/Enemy';
import collidable from '../mixins/collidable';
import { EnemiesTypesInterface } from '../interfaces/interfaces';

class Enemies extends Phaser.GameObjects.Group {
  types: EnemiesTypesInterface;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.types = ENEMY_TYPES;
    Object.assign(this, collidable);
  }

  getMeleeWeapons(): Phaser.GameObjects.Group {
    const meleeWeapons = new Phaser.GameObjects.Group(this.scene);
    const enemies = this.getChildren();
    enemies.forEach((enemy: Enemy) => {
      if (enemy.meleeWeapon) {
        meleeWeapons.add(enemy.meleeWeapon);
      }
    });
    return meleeWeapons;
  }

  getProjectiles(): Phaser.GameObjects.Group {
    const projectiles = new Phaser.GameObjects.Group(this.scene);
    const enemies = this.getChildren();
    enemies.forEach((enemy: Enemy) => {
      if (enemy.projectiles) {
        projectiles.addMultiple(enemy.projectiles.getChildren());
      }
    });

    return projectiles;
  }

  getTypes():EnemiesTypesInterface {
    return this.types;
  }
}

export default Enemies;

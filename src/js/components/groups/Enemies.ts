import * as Phaser from 'phaser';
import ENEMY_TYPES from '../types/types';
import Enemy from '../entities/Enemy';
import collidable from '../mixins/collidable';
import Projectile from '../attacks/Projectile';
import MeleeWeapon from '../attacks/MeleeWeapon';
import Player from '../entities/Player';
import Collectable from '../collectables/Collectable';
import { EnemiesTypesInterface, colliderType } from '../interfaces/interfaces';

class Enemies extends Phaser.GameObjects.Group {
  types: EnemiesTypesInterface;
  addCollider: (otherGameobject: Phaser.Tilemaps.TilemapLayer | Phaser.Physics.Arcade.Sprite
    | Phaser.Physics.Arcade.StaticGroup | Phaser.GameObjects.Group,
    callback?: (()=>void) | ((entity: Player, collectable: Collectable)=>void)
    | ((enemy: Projectile | MeleeWeapon, player: Player)=>void) |
    ((entity: Player | Enemy, source: Projectile | MeleeWeapon)=>void),
    context?: Phaser.Scene) => colliderType;

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

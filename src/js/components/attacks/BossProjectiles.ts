import * as Phaser from 'phaser';
import AimedProjectile from './BossProjectile';
import { getTimestamp } from '../utils/functions';
import Player from '../entities/Player';
import Enemy from '../entities/Enemy';
import { BOSS_PROJECTILES_CENTER_FLIP_OFFSET, BOSS_PROJECTILES_FIRE_OFFSET_Y } from '../entities/consts';

class BossProjectiles extends Phaser.Physics.Arcade.Group {
  timeFromLastProjectile: number;
  constructor(scene: Phaser.Scene, key: string) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key,
      classType: AimedProjectile
    });
    this.timeFromLastProjectile = null;
  }

  fireProjectile(initiator:Enemy | Player, anim: string, target: { x: number, y: number } = null):boolean {
    const projectile = this.getFirstDead(false);

    if (!projectile) {
      return false;
    }

    if (this.timeFromLastProjectile && this.timeFromLastProjectile + projectile.cooldown > getTimestamp()) {
      return false;
    }

    const center:Phaser.Math.Vector2 = initiator.getCenter();
    let centerX:number;

    if (initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      projectile.setFlipX(false);
      centerX = center.x;
    } else {
      projectile.setFlipX(true);
      centerX = center.x - BOSS_PROJECTILES_CENTER_FLIP_OFFSET;
    }

    projectile.fire(centerX, center.y - BOSS_PROJECTILES_FIRE_OFFSET_Y, anim, target);
    this.timeFromLastProjectile = getTimestamp();
    return true;
  }
}

export default BossProjectiles;

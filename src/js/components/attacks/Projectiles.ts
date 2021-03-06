import * as Phaser from 'phaser';
import Projectile from './Projectile';
import { getTimestamp } from '../utils/functions';
import Player from '../entities/Player';
import Enemy from '../entities/Enemy';
import { PROJECTILES_FRAME_QUANTITY, PROJECTILES_CENTER_OFFSET_X } from '../entities/consts';

class Projectiles extends Phaser.Physics.Arcade.Group {
  timeFromLastProjectile: number;
  constructor(scene: Phaser.Scene, key: string) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: PROJECTILES_FRAME_QUANTITY,
      active: false,
      visible: false,
      key,
      classType: Projectile
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
      projectile.speed = Math.abs(projectile.speed);
      projectile.setFlipX(false);
      centerX = center.x + PROJECTILES_CENTER_OFFSET_X;
    } else {
      projectile.speed = -Math.abs(projectile.speed);
      projectile.setFlipX(true);
      centerX = center.x - PROJECTILES_CENTER_OFFSET_X;
    }

    projectile.fire(centerX, center.y, anim, target);
    this.timeFromLastProjectile = getTimestamp();
    return true;
  }
}

export default Projectiles;

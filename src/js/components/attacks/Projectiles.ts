import * as Phaser from 'phaser';
import Projectile from './Projectile';
import getTimestamp from '../utils/functions';

class Projectiles extends Phaser.Physics.Arcade.Group {
  timeFromLastProjectile: any;
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key: 'fireball',
      classType: Projectile
    });

    this.timeFromLastProjectile = null;
  }

  fireProjectile(initiator:any):void {
    const projectile = this.getFirstDead(false);

    if (!projectile) {
      return;
    }

    if (this.timeFromLastProjectile && this.timeFromLastProjectile + projectile.cooldown > getTimestamp()) {
      return;
    }

    const center:any = initiator.getCenter();
    let centerX:number;

    if (initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      projectile.speed = Math.abs(projectile.speed);
      projectile.setFlipX(false);
      centerX = center.x + 10;
    } else {
      projectile.speed = -Math.abs(projectile.speed);
      projectile.setFlipX(true);
      centerX = center.x - 10;
    }

    projectile.fire(centerX, center.y);
    this.timeFromLastProjectile = getTimestamp();
  }
}

export default Projectiles;

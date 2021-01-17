import * as Phaser from 'phaser';
import EffectManager from '../effects/EffectManager';

class Projectile extends Phaser.Physics.Arcade.Sprite {
  speed: any;
  scene: any;
  x: number;
  y: number;
  key: any;
  damage: number;
  traveledDistance: number;
  maxDistance: number;
  cooldown: number;
  effectManager: any;
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 300;
    this.maxDistance = 300;
    this.traveledDistance = 0;

    this.damage = 10;
    this.cooldown = 500;
    this.setBodySize(30, 20)
      .setOffset(15, 32);
    this.effectManager = new EffectManager(this.scene);
  }

  preUpdate(time, delta):void {
    super.preUpdate(time, delta);

    this.traveledDistance += this.body.deltaAbsX();

    if (this.isOutOfRange()) {
      this.body.reset(0, 0);
      this.activateProjectile(false);
      this.traveledDistance = 0;
    }
  }

  fire(x:number, y:number, anim: string):void {
    this.activateProjectile(true);
    this.body.reset(x, y);
    this.setVelocityX(this.speed);

    if (anim) {
      this.play(anim, true);
    }
  }

  deliversHit(target) {
    this.activateProjectile(false);
    this.traveledDistance = 0;
    const impactPosition = { x: this.x, y: this.y };
    this.body.reset(0, 0);
    this.effectManager.playEffectOn('explosion-hit', target, impactPosition);
  }

  activateProjectile(isActive: boolean):void {
    this.setActive(isActive);
    this.setVisible(isActive);
  }

  isOutOfRange():boolean {
    return this.traveledDistance && this.traveledDistance >= this.maxDistance;
  }
}

export default Projectile;

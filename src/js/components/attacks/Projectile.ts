import * as Phaser from 'phaser';
import EffectManager from '../effects/EffectManager';
import { PROJECTILE_SPEED, PROJECTILE_MAXDISTANCE, PROJECTILE_DAMAGE, PROJECTILE_COOLDOWN, PROJECTILE_WIDTH, PROJECTILE_HEIGHT, PROJECTILE_OFFSET_X, PROJECTILE_OFFSET_Y, AIMED_PROJECTILE_SWAY_MULTIPLIER } from '../entities/consts';

class Projectile extends Phaser.Physics.Arcade.Sprite {
  speed: number;
  scene: Phaser.Scene;
  x: number;
  y: number;
  xSpeed: number;
  ySpeed: number;
  direction: number;
  key: string;
  damage: number;
  traveledDistance: number;
  maxDistance: number;
  cooldown: number;
  effectManager: EffectManager;
  constructor(scene: Phaser.Scene, x: number, y:number, key:string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = PROJECTILE_SPEED;
    this.maxDistance = PROJECTILE_MAXDISTANCE;
    this.traveledDistance = 0;

    this.xSpeed = 0;
    this.ySpeed = 0;
    this.direction = 0;

    this.damage = PROJECTILE_DAMAGE;
    this.cooldown = PROJECTILE_COOLDOWN;
    this.setBodySize(PROJECTILE_WIDTH, PROJECTILE_HEIGHT)
      .setOffset(PROJECTILE_OFFSET_X, PROJECTILE_OFFSET_Y);
    this.effectManager = new EffectManager(this.scene);
  }

  preUpdate(time:number, delta:number):void {
    super.preUpdate(time, delta);

    this.traveledDistance += this.body.deltaAbsX();

    if (this.isOutOfRange()) {
      this.body.reset(0, 0);
      this.activateProjectile(false);
      this.traveledDistance = 0;
    }
  }

  fire(x:number, y:number, anim: string, target : { x: number, y: number }):void {
    this.activateProjectile(true);
    this.body.reset(x, y);
    if (target === null) {
      this.setVelocityX(this.speed);
    } else {
      this.direction = Math.atan((target.x - this.x) / (target.y - this.y));
      this.direction += ((Math.random() / AIMED_PROJECTILE_SWAY_MULTIPLIER)) + (-(Math.random() / AIMED_PROJECTILE_SWAY_MULTIPLIER));

      if (target.y >= this.y) {
        this.xSpeed = this.speed * Math.sin(this.direction);
        this.ySpeed = this.speed * Math.cos(this.direction);
      } else {
        this.xSpeed = -this.speed * Math.sin(this.direction);
        this.ySpeed = -this.speed * Math.cos(this.direction);
      }

      this.setVelocityX(this.xSpeed);
      this.setVelocityY(this.ySpeed);

      this.rotation = Phaser.Math.Angle.Between(x, y, target.x, target.y);
    }

    if (anim) {
      this.play(anim, true);
    }
  }

  deliversHit(target:Phaser.Physics.Arcade.Sprite):void {
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

import * as Phaser from 'phaser';
import EffectManager from '../effects/EffectManager';

class AimedProjectile extends Phaser.Physics.Arcade.Sprite {
  xSpeed: number;
  ySpeed: number;
  speed: number;
  direction: number;
  scene: Phaser.Scene;
  x: number;
  y: number;
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

    this.xSpeed = 0;
    this.ySpeed = 0;
    this.speed = 300;
    this.direction = 0;
    this.maxDistance = 500;
    this.traveledDistance = 0;

    this.damage = 10;
    this.cooldown = 500;
    this.setBodySize(30, 20)
      .setOffset(15, 32);
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

    this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

    this.xSpeed = this.speed * Math.sin(this.direction);
    this.ySpeed = this.speed * Math.cos(this.direction);

    this.setVelocityX(this.xSpeed);
    this.setVelocityY(this.ySpeed);

    this.rotation = 90;

    console.log('Rotation: ', this.rotation);

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

export default AimedProjectile;
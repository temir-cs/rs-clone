import * as Phaser from 'phaser';

class Projectile extends Phaser.Physics.Arcade.Sprite {
  speed: any;
  sceen: any;
  x: number;
  y: number;
  key: any;
  damage: number;
  traveledDistance: number;
  maxDistance: number;
  cooldown: number;
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 300;
    this.maxDistance = 300;
    this.traveledDistance = 0;

    this.damage = 10;
    this.cooldown = 500;
  }

  preUpdate(time, delta):void {
    super.preUpdate(time, delta);

    this.traveledDistance += this.body.deltaAbsX();

    if (this.isOutOfRange()) {
      this.body.reset(0, 0);
      this.setActive(false);
      this.setVisible(false);
      this.traveledDistance = 0;
    }
  }

  fire(x:number, y:number):void {
    this.setActive(true);
    this.setVisible(true);
    this.body.reset(x, y);
    this.setVelocityX(this.speed);
  }

  isOutOfRange():boolean {
    return this.traveledDistance && this.traveledDistance >= this.maxDistance;
  }
}

export default Projectile;

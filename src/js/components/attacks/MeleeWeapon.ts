import * as Phaser from 'phaser';
import EffectManager from '../effects/EffectManager';

class MeleeWeapon extends Phaser.Physics.Arcade.Sprite {
  attackSpeed: number;
  scene: any;
  x: number;
  y: number;
  weaponName: any;
  damage: number;
  wielder: any;
  effectManager: any;
  constructor(scene, x, y, weaponName) {
    super(scene, x, y, weaponName);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.damage = 15;
    this.attackSpeed = 1000;
    this.weaponName = weaponName;
    this.wielder = null;
    this.effectManager = new EffectManager(this.scene);

    this.setOrigin(0.5, 1);
    this.setDepth(10);

    this.activateWeapon(false);
    this.body.reset(0, 0);

    this.on('animationcomplete', (animation) => {
      console.log('animEnd');
      // if (animation.key === this.weaponName) {
      //   this.activateWeapon(false);
      //   this.body.reset(0, 0);
      //   this.body.checkCollision.none = false;
      // }
    });
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (!this.active) { return; }

    if (this.wielder.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setFlipX(false);
      this.body.reset(this.wielder.x + 50, this.wielder.y);
    } else {
      this.setFlipX(true);
      this.body.reset(this.wielder.x - 50, this.wielder.y);
    }
  }

  swing(wielder) {
    this.wielder = wielder;
    this.activateWeapon(true);
    this.body.reset(wielder.x, wielder.y);
    setTimeout(() => this.stopSwing(this.wielder), 100);
  }

  stopSwing(wielder):void {
    this.wielder = wielder;
    this.activateWeapon(false);
    this.body.checkCollision.none = false;
    this.body.reset(0, 0);
  }

  deliversHit(target) {
    const impactPosition = { x: this.x, y: this.getRightCenter().y };
    this.effectManager.playEffectOn('fire-hit-effect', target, impactPosition);
    this.body.checkCollision.none = true;
  }

  activateWeapon(isActive) {
    this.setActive(isActive);
    this.setVisible(false);
  }
}

export default MeleeWeapon;

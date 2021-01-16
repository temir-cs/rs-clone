import * as Phaser from 'phaser';
import EffectManager from '../effects/EffectManager';
import Player from '../entities/Player';
import Enemy from '../entities/Enemy';

class MeleeWeapon extends Phaser.Physics.Arcade.Sprite {
  attackSpeed: number;
  scene: Phaser.Scene;
  x: number;
  y: number;
  weaponName: string;
  damage: number;
  wielder: Player;
  effectManager: EffectManager;

  constructor(scene: Phaser.Scene, x: number, y: number, weaponName: string, player: Player) {
    super(scene, x, y, weaponName);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.damage = 15;
    this.attackSpeed = 500;
    this.weaponName = weaponName;
    this.wielder = player;
    this.effectManager = new EffectManager(this.scene);

    this.setOrigin(1.2, 1.2);
    this.setBodySize(80, 45);
    this.setDepth(10);

    this.setActive(false);
    this.setVisible(false);
    this.body.reset(0, 0);

    this.wielder.on('animationcomplete', (animation) => {
      if (animation.key === 'sword-attack') {
        this.setActive(false);
        this.body.reset(0, 0);
        this.body.checkCollision.none = false;
      }
    });
  }

  preUpdate(time: number, delta: number):void {
    super.preUpdate(time, delta);
    if (!this.active) return;

    if (this.wielder.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setFlipX(false);
      this.body.reset(this.wielder.x + 45, this.wielder.y);
    } else {
      this.setFlipX(true);
      this.body.reset(this.wielder.x, this.wielder.y);
    }
  }

  swing():void {
    this.setActive(true);
    this.body.reset(this.wielder.x, this.wielder.y);
  }

  deliversHit(target: Enemy):void {
    const impactPosition = { x: this.x, y: this.getRightCenter().y };
    this.effectManager.playEffectOn('sword-hit', target, impactPosition);
    this.body.checkCollision.none = true;
  }
}

export default MeleeWeapon;

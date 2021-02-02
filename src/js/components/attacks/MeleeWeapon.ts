import * as Phaser from 'phaser';
import EffectManager from '../effects/EffectManager';
import Player from '../entities/Player';
import Enemy from '../entities/Enemy';
import { MELEE_WEAPON_DAMAGE, MELEE_WEAPON_ATTACK_SPEED, MELEE_WEAPON_ORIGIN_X, MELEE_WEAPON_ORIGIN_Y, MELEE_WEAPON_WIDTH, MELEE_WEAPON_HEIGHT, MELEE_WEAPON_DEPTH, MELEE_WEAPON_RESET_OFFSET_X } from '../entities/consts';

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

    this.damage = MELEE_WEAPON_DAMAGE;
    this.attackSpeed = MELEE_WEAPON_ATTACK_SPEED;
    this.weaponName = weaponName;
    this.wielder = player;
    this.effectManager = new EffectManager(this.scene);

    this.setOrigin(MELEE_WEAPON_ORIGIN_X, MELEE_WEAPON_ORIGIN_Y);
    this.setBodySize(MELEE_WEAPON_WIDTH, MELEE_WEAPON_HEIGHT);
    this.setDepth(MELEE_WEAPON_DEPTH);

    this.setActive(false);
    this.setVisible(false);
    this.body.reset(0, 0);

    this.wielder.on('animationcomplete', (animation) => {
      if (animation.key === `${this.wielder.hero}-attack` || animation.key === `${this.wielder.hero}-run-attack`) {
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
      this.body.reset(this.wielder.x + MELEE_WEAPON_RESET_OFFSET_X, this.wielder.y);
    } else {
      this.setFlipX(true);
      this.body.reset(this.wielder.x, this.wielder.y);
    }
  }

  swing():void {
    this.setActive(true);
    this.body.reset(this.wielder.x, this.wielder.y);
  }

  deliversHit(target: Enemy | Player):void {
    const impactPosition = { x: this.x, y: this.getRightCenter().y };
    this.effectManager.playEffectOn('sword-hit', target, impactPosition);
    this.body.checkCollision.none = true;
  }
}

export default MeleeWeapon;

import * as Phaser from 'phaser';
import EffectManager from '../effects/EffectManager';
import Boss from '../entities/Boss';
import { BOSS_MELEE_WEAPON_DAMAGE, MELEE_WEAPON_ATTACK_SPEED, BOSS_MELEE_WEAPON_ORIGIN_X, BOSS_MELEE_WEAPON_ORIGIN_Y, BOSS_MELEE_WEAPON_WIDTH, BOSS_MELEE_WEAPON_HEIGHT, BOSS_MELEE_WEAPON_DEPTH, BOSS_MELEE_WEAPON_RESET_OFFSET_X } from '../entities/consts';
import Enemy from '../entities/Enemy';
import Player from '../entities/Player';

class BossMeleeWeapon extends Phaser.Physics.Arcade.Sprite {
  attackSpeed: number;
  scene: Phaser.Scene;
  x: number;
  y: number;
  weaponName: string;
  damage: number;
  wielder: Boss;
  effectManager: EffectManager;

  constructor(scene: Phaser.Scene, x: number, y: number, weaponName: string, wielder: Boss) {
    super(scene, x, y, weaponName);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.damage = BOSS_MELEE_WEAPON_DAMAGE;
    this.attackSpeed = MELEE_WEAPON_ATTACK_SPEED;
    this.weaponName = weaponName;
    this.wielder = wielder;
    this.effectManager = new EffectManager(this.scene);

    this.setOrigin(BOSS_MELEE_WEAPON_ORIGIN_X, BOSS_MELEE_WEAPON_ORIGIN_Y);
    this.setBodySize(BOSS_MELEE_WEAPON_WIDTH, BOSS_MELEE_WEAPON_HEIGHT);
    this.setDepth(BOSS_MELEE_WEAPON_DEPTH);

    this.setActive(false);
    this.setVisible(false);
    this.body.reset(0, 0);
  }

  preUpdate(time: number, delta: number):void {
    super.preUpdate(time, delta);
    if (!this.active) return;

    if (this.wielder.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setFlipX(false);
      this.body.reset(this.wielder.x + BOSS_MELEE_WEAPON_RESET_OFFSET_X, this.wielder.y);
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

export default BossMeleeWeapon;

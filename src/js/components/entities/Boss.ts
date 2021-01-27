import Enemy from './Enemy';
import initAnims from '../animations/bossAnims';
import BossProjectiles from '../attacks/BossProjectiles';
import Projectile from '../attacks/Projectile';
import MeleeWeapon from '../attacks/MeleeWeapon';
import BossMeleeWeapon from '../attacks/BossMeleeWeapon';
import Player from './Player';
import { getTimestamp } from '../utils/functions';

class Boss extends Enemy {
  isDead: boolean;
  projectiles: BossProjectiles;
  meleeWeapon: BossMeleeWeapon;
  timeFromLastShot: number;
  timeFromLastSwing: number;
  distanceToPlayer: number;
  attackDelay: number;
  lastDirection: number;
  constructor(scene:Phaser.Scene, x:number, y:number, player: Player) {
    super(scene, x, y, 'boss', player);
    initAnims(this.scene.anims);
    this.isDead = false;
    this.player = player;
  }

  init():void {
    super.init();
    this.setBodySize(60, 110);
    this.setOffset(45, 95);
    this.setScale(1.2);
    this.name = 'boss';
    this.health = 250;
    this.speed = 50;
    this.hitSound = this.scene.sound.add('imp-hit', { volume: 0.4 });
    this.deathSound = this.scene.sound.add('imp-dead', { volume: 0.4 });

    this.projectiles = new BossProjectiles(this.scene, 'tesla-ball');
    this.meleeWeapon = new BossMeleeWeapon(this.scene, 0, 0, 'boss-attack', this);
    this.timeFromLastShot = 0;
    this.timeFromLastSwing = 0;
    this.setAttackDelay();
    this.lastDirection = null;
  }

  setAttackDelay():void {
    // this.attackDelay = Phaser.Math.Between(1000, 4000);
    this.attackDelay = 2000;
  }

  update(time:number, delta:number):void {
    // disable patrolling
    // super.update(time, delta);
    this.distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

    if (!this.active) return;

    if (this.body.x > this.player.x) {
      this.setFlipX(true);
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
    } else {
      this.setFlipX(false);
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    }

    // if (this.body.velocity.x > 0) {
    //
    // } else {
    //
    // }

    if (this.distanceToPlayer > 300) {
      if (this.timeFromLastShot + this.attackDelay <= time) {
        this.projectiles.fireProjectile(this, 'tesla-ball', this.player);
        this.play('boss-magic-attack', true);
        this.timeFromLastShot = time;
        this.setAttackDelay();
      }
    } else {
      if (this.timeFromLastSwing + 3000 <= time) {
        this.meleeWeapon.swing();
        this.play('boss-attack', true);
        this.timeFromLastSwing = time;
      }
    }

    if (this.isPlayingAnims('boss-hurt')
    || this.isPlayingAnims('boss-death')
    || this.isPlayingAnims('boss-attack')
    || this.isPlayingAnims('boss-magic-attack')) return;

    if (this.isDead) {
      this.setActive(false);
      this.play('boss-death', true);
      setTimeout(() => {
        this.rayGraphics.clear();
        this.destroy();
      }, 400);
      return;
    }
    this.setVelocityX(0);
    this.play('boss-idle', true);
  }

  getMeleeWeapon():BossMeleeWeapon {
    return this.meleeWeapon;
  }

  takesHit(source: Projectile | MeleeWeapon):void {
    super.takesHit(source);
    this.setVelocityX(this.speed * 0.1);
    this.play('boss-hurt', true);

    if (this.health <= 0) {
      this.play('boss-death', true);
      this.setVelocityX(0);
      this.isDead = true;
    }
  }
}

export default Boss;

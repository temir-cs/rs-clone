import Enemy from './Enemy';
import initAnims from '../animations/bossAnims';
import BossProjectiles from '../attacks/BossProjectiles';
import Projectile from '../attacks/Projectile';
import MeleeWeapon from '../attacks/MeleeWeapon';
import BossMeleeWeapon from '../attacks/BossMeleeWeapon';
import Player from './Player';
import Play from '../scenes/Play';
import { BOSS_BODY_WIDTH, BOSS_BODY_HEIGHT, BOSS_OFFSET_X, BOSS_OFFSET_Y, BOSS_SCALE, BOSS_HEALTH, BOSS_SPEED, ENEMY_HIT_VOLUME, BOSS_DEATH_VOLUME, RANGED_ENEMY_ATTACK_DELAY_LOWER_BOUND, RANGED_ENEMY_ATTACK_DELAY_UPPER_BOUND, BOSS_CHANGE_ATTACK_DISTANCE, BOSS_MELEE_ATTACK_DELAY, BOSS_MELEE_ATTACK_ENABLE_TIMEOUT, BOSS_MELEE_ATTACK_DISABLE_TIMEOUT, BOSS_DESTROY_TIMEOUT } from './consts';

class Boss extends Enemy {
  isDead: boolean;
  projectiles: BossProjectiles;
  meleeWeapon: BossMeleeWeapon;
  timeFromLastShot: number;
  timeFromLastSwing: number;
  distanceToPlayer: number;
  attackDelay: number;
  lastDirection: number;
  constructor(scene: Play, x:number, y:number, player: Player) {
    super(scene, x, y, 'boss', player);
    initAnims(this.scene.anims);
    this.isDead = false;
    this.player = player;
  }

  init():void {
    super.init();
    this.setBodySize(BOSS_BODY_WIDTH, BOSS_BODY_HEIGHT);
    this.setOffset(BOSS_OFFSET_X, BOSS_OFFSET_Y);
    this.setScale(BOSS_SCALE);
    this.name = 'boss';
    this.health = BOSS_HEALTH;
    this.speed = BOSS_SPEED;
    this.hitSound = this.scene.sound.add('boss-hit', { volume: ENEMY_HIT_VOLUME });
    this.deathSound = this.scene.sound.add('boss-death', { volume: BOSS_DEATH_VOLUME });

    this.projectiles = new BossProjectiles(this.scene, 'tesla-ball');
    this.meleeWeapon = new BossMeleeWeapon(this.scene, 0, 0, 'boss-attack', this);
    this.timeFromLastShot = 0;
    this.timeFromLastSwing = 0;
    this.setAttackDelay();
    this.lastDirection = null;
  }

  setAttackDelay():void {
    this.attackDelay = Phaser.Math.Between(RANGED_ENEMY_ATTACK_DELAY_LOWER_BOUND, RANGED_ENEMY_ATTACK_DELAY_UPPER_BOUND);
  }

  update(time:number):void {
    this.distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    if (!this.active) return;

    if (this.isPlayingAnims('boss-hurt')
    || this.isPlayingAnims('boss-death')
    || this.isPlayingAnims('boss-attack')) return;

    if (this.isDead) {
      this.setActive(false);
      setTimeout(() => {
        this.destroy();
      }, BOSS_DESTROY_TIMEOUT);
      return;
    }

    if (this.body.x > this.player.x) {
      this.setFlipX(true);
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
    } else {
      this.setFlipX(false);
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    }

    if (this.distanceToPlayer > BOSS_CHANGE_ATTACK_DISTANCE) {
      if (this.timeFromLastShot + this.attackDelay <= time) {
        this.play('boss-magic-attack', true);
        this.on('animationcomplete', (animation) => {
          if (animation.key === 'boss-magic-attack') {
            this.projectiles.fireProjectile(this, 'tesla-ball', this.player);
          }
        });
        this.stopThenWalk();
        this.timeFromLastShot = time;
        this.setAttackDelay();
      }
    } else {
      if (this.timeFromLastSwing + BOSS_MELEE_ATTACK_DELAY <= time) {
        this.setVelocityX(0);
        this.play('boss-attack', true);
        setTimeout(() => {
          this.meleeWeapon.swing();
        }, BOSS_MELEE_ATTACK_ENABLE_TIMEOUT);
        setTimeout(() => {
          this.meleeWeapon.setActive(false);
          this.meleeWeapon.body.reset(0, 0);
          this.meleeWeapon.body.checkCollision.none = false;
          this.stopThenWalk();
        }, BOSS_MELEE_ATTACK_DISABLE_TIMEOUT);
        this.timeFromLastSwing = time;
      }
    }

    if (this.isPlayingAnims('boss-attack')
    || this.isPlayingAnims('boss-magic-attack')) return;

    if (this.body.velocity.x === 0) {
      this.play('boss-idle', true);
    } else {
      this.play('boss-walk', true);
    }
  }

  getMeleeWeapon():BossMeleeWeapon {
    return this.meleeWeapon;
  }

  stopThenWalk():void {
    this.setVelocityX(0);
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.setBossVelocity();
      },
      loop: false,
    });
  }

  setBossVelocity():void {
    if (this.body.x > this.player.x) {
      this.setVelocityX(-this.speed);
    } else {
      this.setVelocityX(this.speed);
    }
  }

  takesHit(source: Projectile | MeleeWeapon):void {
    super.takesHit(source);
    this.play('boss-hurt', true);
    if (this.health <= 0) {
      localStorage.setItem('boss', 'dead');
      this.play('boss-death', true);
      this.setVelocityX(0);
      this.isDead = true;
    }
  }
}

export default Boss;

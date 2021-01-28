import Enemy from './Enemy';
import initAnims from '../animations/bossAnims';
import BossProjectiles from '../attacks/BossProjectiles';
import Projectile from '../attacks/Projectile';
import MeleeWeapon from '../attacks/MeleeWeapon';
import BossMeleeWeapon from '../attacks/BossMeleeWeapon';
import Player from './Player';
import Play from '../scenes/Play';

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
    this.setBodySize(50, 110);
    this.setOffset(55, 95);
    this.setScale(1.2);
    this.name = 'boss';
    this.health = 200;
    this.speed = 40;
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
    this.attackDelay = Phaser.Math.Between(1000, 4000);
    console.log('Attack delay: ', this.attackDelay);
    // this.attackDelay = 2000;
  }

  update(time:number, delta:number):void {
    // if (this) {
    //   if (this.anims.currentAnim) {
    //     console.log('Current anim: ', this.anims.currentAnim.key, 'Frame: ', this.anims.currentFrame.index);
    //   }
    // }

    // console.log('delta: ', delta);
    // console.log('Velocity: ', this.body.velocity);

    this.distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    if (!this.active) return;

    if (this.isPlayingAnims('boss-hurt')
    || this.isPlayingAnims('boss-death')
    || this.isPlayingAnims('boss-attack')) return;

    if (this.isDead) {
      this.setActive(false);
      setTimeout(() => {
        this.destroy();
      }, 1500);
      return;
    }

    if (this.body.x > this.player.x) {
      this.setFlipX(true);
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
    } else {
      this.setFlipX(false);
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    }

    if (this.distanceToPlayer > 275) {
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
      if (this.timeFromLastSwing + 3000 <= time) {
        this.setVelocityX(0);
        this.play('boss-attack', true);
        setTimeout(() => {
          this.meleeWeapon.swing();
        }, 400);
        setTimeout(() => {
          console.log('Swing finished!');
          this.meleeWeapon.setActive(false);
          this.meleeWeapon.body.reset(0, 0);
          this.meleeWeapon.body.checkCollision.none = false;
          this.stopThenWalk();
        }, 700);
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
    // setTimeout(() => {
    //   this.setBossVelocity();
    // }, 1000);
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
    console.log('Health left: ', this.health);
    this.play('boss-hurt', true);

    if (this.health <= 0) {
      this.play('boss-death', true);
      this.setVelocityX(0);
      this.isDead = true;
    }
  }
}

export default Boss;

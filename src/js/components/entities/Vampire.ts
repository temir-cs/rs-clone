import Enemy from './Enemy';
import Player from './Player';

import initAnims from '../animations/vampireAnims';
import Projectiles from '../attacks/Projectiles';

class Vampire extends Enemy {
  isDead: boolean;
  projectiles: Projectiles;
  timeFromLastAttack: number;
  attackDelay: number;
  lastDirection: number;

  constructor(scene:Phaser.Scene, x:number, y:number, player: Player) {
    super(scene, x, y, 'vampire', player);

    initAnims(this.scene.anims);
    this.isDead = false;
  }

  init() {
    super.init();
    this.speed = 60;
   this.setBodySize(40, 80);
    this.setOrigin(0, 0);
    this.setOffset(20, 26);
    this.projectiles = new Projectiles(this.scene, 'fire-projectile');
    this.timeFromLastAttack = 0;
    this.attackDelay = this.getAttackDelay();
    this.lastDirection = null;
  }

  getAttackDelay():number {
    return Phaser.Math.Between(1000, 4000);
  }

  update(time:number, delta:number):void {
    super.update(time, delta);

    if (!this.active) return;

    if (this.body.velocity.x > 0) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    } else {
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
    }

    if (this.timeFromLastAttack + this.attackDelay <= time) {
      this.play('vampire-attack', true);
      setTimeout(() => {
        this.projectiles.fireProjectile(this, 'fire-projectile');
      }, 600);

      this.timeFromLastAttack = time;
      this.attackDelay = this.getAttackDelay();
    }
    if (this.isPlayingAnims('vampire-hurt') || this.isPlayingAnims('vampire-death') || this.isPlayingAnims('vampire-attack')) {
      return;
    }

    if (this.isDead) {
      this.setActive(false);
      this.play('vampire-death', true);
      setTimeout(() => {
        this.rayGraphics.clear();
        this.destroy();
      }, 400);
      return;
    }
    this.setVelocityX(this.speed);
    this.play('vampire-walk', true);
  }

  takesHit(source):void {
    super.takesHit(source);
    this.setVelocityX(this.speed * 0.1);
    this.play('vampire-hurt', true);

    if (this.health <= 0) {
      this.play('vampire-death', true);
      this.setVelocityX(0);
      this.isDead = true;
    }
  }
}

export default Vampire;

import Enemy from './Enemy';
import initAnims from '../animations/impAnim';
import Projectiles from '../attacks/Projectiles';

class Imp extends Enemy {
  isDead: boolean;
  projectiles: Projectiles;
  timeFromLastAttack: number;
  attackDelay: number;
  lastDirection: number;
  constructor(scene:Phaser.Scene, x:number, y:number) {
    super(scene, x, y, 'imp');
    initAnims(this.scene.anims);
    this.isDead = false;
  }

  init() {
    super.init();
    this.setBodySize(35, 60);
    this.setOffset(100, 100);
    this.speed = 50;

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
      this.projectiles.fireProjectile(this, 'fire-projectile');
      this.play('imp-attack', true);

      this.timeFromLastAttack = time;
      this.attackDelay = this.getAttackDelay();
    }

    if (this.isPlayingAnims('imp-hurt') || this.isPlayingAnims('imp-death')) { return; }
    if (this.isDead) {
      this.setActive(false);
      this.play('imp-dead', true);
      setTimeout(() => {
        this.rayGraphics.clear();
        this.destroy();
      }, 400);
      return;
    }
    this.setVelocityX(this.speed);
    this.play('imp-walk', true);
  }

  takesHit(source):void {
    super.takesHit(source);
    this.setVelocityX(this.speed * 0.1);
    this.play('imp-hurt', true);

    if (this.health <= 0) {
      this.play('imp-death', true);
      this.setVelocityX(0);
      this.isDead = true;
    }
  }
}

export default Imp;

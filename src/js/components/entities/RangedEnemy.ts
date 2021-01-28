import Enemy from './Enemy';
import Projectiles from '../attacks/Projectiles';
import Projectile from '../attacks/Projectile';
import MeleeWeapon from '../attacks/MeleeWeapon';
import Player from './Player';
import Play from '../scenes/Play';

class RangedEnemy extends Enemy {
  isDead: boolean;
  enemyName: string;
  projectiles: Projectiles;
  timeFromLastAttack: number;
  attackDelay: number;
  lastDirection: number;

  constructor(scene:Play, x:number, y:number, enemyName: string, player: Player) {
    super(scene, x, y, enemyName, player);
    this.enemyName = enemyName;
    this.isDead = false;
    this.player = player;
  }

  init():void {
    super.init();

    this.projectiles = new Projectiles(this.scene, 'fire-projectile');
    this.timeFromLastAttack = 0;
    this.setAttackDelay();
    this.lastDirection = null;
  }

  setAttackDelay():void {
    this.attackDelay = Phaser.Math.Between(1000, 4000);
  }

  update(time:number, delta:number):void {
    super.update(time, delta);
    if (!this.active) return;

    if (this.isPlayingAnims(`${this.enemyName}-hurt`)
    || this.isPlayingAnims(`${this.enemyName}-death`)) return;

    if (this.isDead) {
      this.setActive(false);
      setTimeout(() => {
        this.rayGraphics.clear();
        this.destroy();
      }, 400);
      return;
    }

    if (this.body.velocity.x > 0) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    } else {
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
    }

    if (this.timeFromLastAttack + this.attackDelay <= time) {
      this.projectiles.fireProjectile(this, 'fire-projectile');
      this.play(`${this.enemyName}-attack`, true);
      this.timeFromLastAttack = time;
      this.setAttackDelay();
    }

    if (this.isPlayingAnims(`${this.enemyName}-attack`)) return;

    this.setVelocityX(this.speed);
    this.play(`${this.enemyName}-walk`, true);
  }

  takesHit(source: Projectile | MeleeWeapon):void {
    super.takesHit(source);
    this.setVelocityX(this.speed * 0.1);
    this.play(`${this.enemyName}-hurt`, true);

    if (this.health <= 0) {
      this.play(`${this.enemyName}-death`, true);
      this.setVelocityX(0);
      this.isDead = true;
    }
  }
}

export default RangedEnemy;

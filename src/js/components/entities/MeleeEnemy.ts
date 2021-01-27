import Enemy from './Enemy';
import Player from './Player';
import Projectile from '../attacks/Projectile';
import MeleeWeapon from '../attacks/MeleeWeapon';
import Play from '../scenes/Play';

class MeleeEnemy extends Enemy {
  isDead: boolean;
  enemyName: string;

  constructor(scene:Play, x:number, y:number, enemyName: string, player: Player) {
    super(scene, x, y, enemyName, player);
    this.enemyName = enemyName;
    this.isDead = false;
  }

  update(time:number, delta:number):void {
    super.update(time, delta);
    if (!this.active) return;
    if (this.isPlayingAnims(`${this.enemyName}-hurt`) || this.isPlayingAnims(`${this.enemyName}-death`)) { return; }
    if (this.isDead) {
      this.setActive(false);
      this.play(`${this.enemyName}-death`, true);
      setTimeout(() => {
        this.rayGraphics.clear();
        this.destroy();
      }, 400);
      return;
    }
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

export default MeleeEnemy;

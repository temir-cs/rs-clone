import Enemy from './Enemy';
import Player from './Player';
import Play from '../scenes/Play';
import {
  ENEMY_DESTROY_TIMEOUT,
} from './consts';

class MeleeEnemy extends Enemy {
  isDead: boolean;
  enemyName: string;

  constructor(scene:Play, x:number, y:number, enemyName: string, player: Player) {
    super(scene, x, y, enemyName, player);
    this.enemyName = enemyName;
  }

  update(time:number, delta:number):void {
    super.update(time, delta);
    if (!this.active) return;
    if (this.isPlayingAnims(`${this.enemyName}-hurt`) || this.isPlayingAnims(`${this.enemyName}-death`)) { return; }
    if (this.isDead) {
      this.setActive(false);
      setTimeout(() => {
        this.rayGraphics.clear();
        this.destroy();
      }, ENEMY_DESTROY_TIMEOUT);
      return;
    }
    this.setVelocityX(this.speed);
    this.play(`${this.enemyName}-walk`, true);
  }
}

export default MeleeEnemy;

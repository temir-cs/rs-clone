import EnemyNotShooting from './EnemyNotShooting';
import Player from './Player';

import initAnims from '../animations/trollAnim';

class Troll extends EnemyNotShooting {
  isDead: boolean;
  constructor(scene:Phaser.Scene, x:number, y:number, player: Player) {
    super(scene, x, y, 'troll', player);

    this.setBodySize(40, 50);
    this.setOffset(38, 38);
    initAnims(this.scene.anims);
  }
}

export default Troll;

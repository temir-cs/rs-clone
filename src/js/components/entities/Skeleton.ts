import MeleeEnemy from './MeleeEnemy';
import Player from './Player';

import initAnims from '../animations/skeletonAnims';

class Skeleton extends MeleeEnemy {
  isDead: boolean;
  constructor(scene:Phaser.Scene, x:number, y:number, player: Player) {
    super(scene, x, y, 'skeleton', player);
    this.speed = 60;
    this.setBodySize(40, 70);
    this.setOrigin(0, 0);
    this.setOffset(20, 30);
    initAnims(this.scene.anims);
  }
}

export default Skeleton;

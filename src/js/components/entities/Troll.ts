import MeleeEnemy from './MeleeEnemy';
import Player from './Player';

import initAnims from '../animations/trollAnim';
import Play from '../scenes/Play';

class Troll extends MeleeEnemy {
  isDead: boolean;
  constructor(scene:Play, x:number, y:number, player: Player) {
    super(scene, x, y, 'troll', player);

    this.setBodySize(40, 50);
    this.setOffset(38, 38);
    initAnims(this.scene.anims);
  }
}

export default Troll;

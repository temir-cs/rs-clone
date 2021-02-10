import MeleeEnemy from './MeleeEnemy';
import Player from './Player';

import initAnims from '../animations/trollAnim';
import Play from '../scenes/Play';
import { TROLL_BODY_HEIGHT, TROLL_BODY_WIDTH, TROLL_OFFSET_X, TROLL_OFFSET_Y } from './consts';

class Troll extends MeleeEnemy {
  isDead: boolean;
  constructor(scene:Play, x:number, y:number, player: Player) {
    super(scene, x, y, 'troll', player);

    this.setBodySize(TROLL_BODY_WIDTH, TROLL_BODY_HEIGHT);
    this.setOffset(TROLL_OFFSET_X, TROLL_OFFSET_Y);
    initAnims(this.scene.anims);
  }
}

export default Troll;

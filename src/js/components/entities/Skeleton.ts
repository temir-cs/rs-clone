import MeleeEnemy from './MeleeEnemy';
import Player from './Player';

import initAnims from '../animations/skeletonAnims';
import Play from '../scenes/Play';
import { SKELETON_BODY_WIDTH, SKELETON_BODY_HEIGHT, SKELETON_ORIGIN_X, SKELETON_ORIGIN_Y, SKELETON_OFFSET_X, SKELETON_OFFSET_Y } from './consts';

class Skeleton extends MeleeEnemy {
  isDead: boolean;
  constructor(scene:Play, x:number, y:number, player: Player) {
    super(scene, x, y, 'skeleton', player);
    this.speed = 60;
    this.setBodySize(SKELETON_BODY_WIDTH, SKELETON_BODY_HEIGHT);
    this.setOrigin(SKELETON_ORIGIN_X, SKELETON_ORIGIN_Y);
    this.setOffset(SKELETON_OFFSET_X, SKELETON_OFFSET_Y);
    initAnims(this.scene.anims);
  }
}

export default Skeleton;

import RangedEnemy from './RangedEnemy';
import Player from './Player';
import initAnims from '../animations/vampireAnims';
import Play from '../scenes/Play';
import { VAMPIRE_BODY_WIDTH, VAMPIRE_BODY_HEIGHT, VAMPIRE_OFFSET_X, VAMPIRE_OFFSET_Y, VAMPIRE_HEALTH, VAMPIRE_SPEED } from './consts';

class Vampire extends RangedEnemy {
  constructor(scene:Play, x:number, y:number, player: Player) {
    super(scene, x, y, 'vampire', player);
    this.setBodySize(VAMPIRE_BODY_WIDTH, VAMPIRE_BODY_HEIGHT);
    this.setOffset(VAMPIRE_OFFSET_X, VAMPIRE_OFFSET_Y);
    this.health = VAMPIRE_HEALTH;
    this.speed = VAMPIRE_SPEED;
    initAnims(this.scene.anims);
  }
}

export default Vampire;

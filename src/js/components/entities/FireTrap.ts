import Trap from './Trap';
import Player from './Player';
import {
  TRAP_DEFAULT_DAMAGE,
  FIRETRAP_BODY_WIDTH,
  FIRETRAP_BODY_HEIGHT,
  TRAP_ORIGIN_X,
  TRAP_ORIGIN_Y,
  FIRETRAP_OFFSET_X,
  FIRETRAP_OFFSET_Y,
} from './consts';

class FireTrap extends Trap {
  constructor(scene:Phaser.Scene, x:number, y:number, key: string, player: Player) {
    super(scene, x, y, key, player);
    this.damage = TRAP_DEFAULT_DAMAGE;
    this.setOrigin(TRAP_ORIGIN_X, TRAP_ORIGIN_Y);
    this.setBodySize(FIRETRAP_BODY_WIDTH, FIRETRAP_BODY_HEIGHT);
    this.setOffset(FIRETRAP_OFFSET_X, FIRETRAP_OFFSET_Y);
  }
}

export default FireTrap;

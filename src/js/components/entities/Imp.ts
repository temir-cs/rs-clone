import RangedEnemy from './RangedEnemy';
import initAnims from '../animations/impAnim';
import Player from './Player';
import Play from '../scenes/Play';

import {
  IMP_BODY_WIDTH,
  IMP_BODY_HEIGHT,
  IMP_OFFSET_X,
  IMP_OFFSET_Y,
  IMP_SCALE,
  IMP_HEALTH,
  IMP_SPEED,
  ENEMY_HIT_VOLUME,
  ENEMY_DEATH_VOLUME,
} from './consts';

class Imp extends RangedEnemy {
  constructor(scene:Play, x:number, y:number, player: Player) {
    super(scene, x, y, 'imp', player);
    this.setBodySize(IMP_BODY_WIDTH, IMP_BODY_HEIGHT);
    this.setOffset(IMP_OFFSET_X, IMP_OFFSET_Y);
    this.setScale(IMP_SCALE);
    this.health = IMP_HEALTH;
    this.speed = IMP_SPEED;
    this.hitSound = this.scene.sound.add('imp-hit', { volume: ENEMY_HIT_VOLUME });
    this.deathSound = this.scene.sound.add('imp-dead', { volume: ENEMY_DEATH_VOLUME });
    initAnims(this.scene.anims);
  }
}

export default Imp;

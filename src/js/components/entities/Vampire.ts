import RangedEnemy from './RangedEnemy';
import Player from './Player';
import initAnims from '../animations/vampireAnims';
import Play from '../scenes/Play';

class Vampire extends RangedEnemy {
  constructor(scene:Play, x:number, y:number, player: Player) {
    super(scene, x, y, 'vampire', player);
    this.setBodySize(40, 80);
    this.setOffset(20, 26);
    this.health = 60;
    this.speed = 60;
    initAnims(this.scene.anims);
  }
}

export default Vampire;

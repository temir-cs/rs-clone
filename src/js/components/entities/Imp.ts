import RangedEnemy from './RangedEnemy';
import initAnims from '../animations/impAnim';
import Player from './Player';
import Play from '../scenes/Play';

class Imp extends RangedEnemy {
  constructor(scene:Play, x:number, y:number, player: Player) {
    super(scene, x, y, 'imp', player);
    this.setBodySize(35, 60);
    this.setOffset(100, 100);
    this.setScale(1.2);
    this.health = 60;
    this.speed = 50;
    this.hitSound = this.scene.sound.add('imp-hit', { volume: 0.4 });
    this.deathSound = this.scene.sound.add('imp-dead', { volume: 0.4 });
    initAnims(this.scene.anims);
  }
}

export default Imp;

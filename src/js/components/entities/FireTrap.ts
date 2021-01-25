import Trap from './Trap';
import Player from './Player';

class FireTrap extends Trap {
  constructor(scene:Phaser.Scene, x:number, y:number, key: string, player: Player) {
    super(scene, x, y, key, player);
    this.damage = 10;
    this.setOrigin(0.5, 1);
    this.setBodySize(30, 1);
    this.setOffset(50, 130);
  }
}

export default FireTrap;

import Trap from './Trap';

class FireTrap extends Trap {
  constructor(scene:Phaser.Scene, x:number, y:number, key: string) {
    super(scene, x, y, key);
    this.damage = 10;
    this.setOrigin(0.5, 1);
    this.setBodySize(30, 1);
    this.setOffset(50, 130);
  }
}

export default FireTrap;

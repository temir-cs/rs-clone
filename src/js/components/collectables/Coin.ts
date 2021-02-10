import Collectable from './Collectable';

class Coin extends Collectable {
  constructor(scene:Phaser.Scene, x:number, y:number) {
    super(scene, x, y);
    this.play('coin', true);

    this.pickupSound = scene.sound.add('coin-pickup', { volume: 0.4 });
  }
}

export default Coin;

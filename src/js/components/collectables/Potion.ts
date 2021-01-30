import Collectable from './Collectable';

class Potion extends Collectable {
  constructor(scene:Phaser.Scene, x:number, y:number) {
    super(scene, x, y);
    this.play('hit-point', true);

    this.pickupSound = scene.sound.add('hit-point-pickup', { volume: 0.4 });
  }
}

export default Potion;

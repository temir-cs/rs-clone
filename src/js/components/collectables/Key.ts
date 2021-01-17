import initAnims from '../animations/collectablesAnims';
import Collectable from './Collectable';

class Key extends Collectable {
  constructor(scene:Phaser.Scene, x:number, y:number) {
    super(scene, x, y);
    this.play('key', true);

    this.pickupSound = scene.sound.add('key-pickup', { volume: 0.4 });
  }
}

export default Key;

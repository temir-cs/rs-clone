import * as Phaser from 'phaser';
import initAnims from '../animations/collectablesAnims';

class Collectable extends Phaser.Physics.Arcade.Sprite {
  score: number;
  pickupSound: Phaser.Sound.BaseSound;
  constructor(scene:Phaser.Scene, x:number, y:number) {
    super(scene, x, y, 'collectables');
    scene.add.existing(this);
    initAnims(this.scene.anims);

    this.setOrigin(0, 1);

    scene.tweens.add({
      targets: this,
      y: this.y - 4,
      duration: Phaser.Math.Between(1000, 2000),
      repeat: -1,
      easy: 'linear',
      yoyo: true,
    });
  }
}

export default Collectable;

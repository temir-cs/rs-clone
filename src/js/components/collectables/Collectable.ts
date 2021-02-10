import * as Phaser from 'phaser';
import initAnims from '../animations/collectablesAnims';
import { COLLECTABLE_TWEEN_LOWER_BOUND, COLLECTABLE_TWEEN_OFFSET_Y, COLLECTABLE_TWEEN_UPPER_BOUND } from '../entities/consts';

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
      y: this.y - COLLECTABLE_TWEEN_OFFSET_Y,
      duration: Phaser.Math.Between(COLLECTABLE_TWEEN_LOWER_BOUND, COLLECTABLE_TWEEN_UPPER_BOUND),
      repeat: -1,
      easy: 'linear',
      yoyo: true,
    });
  }
}

export default Collectable;

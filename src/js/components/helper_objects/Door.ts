import * as Phaser from 'phaser';
import initAnims from '../animations/doorsAnims';

class Door extends Phaser.Physics.Arcade.Sprite {
  openSound: any;

  constructor(scene:Phaser.Scene, x:number, y:number, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    initAnims(this.scene.anims);
    this.play('castle-door-idle', true);

    this.openSound = this.scene.sound.add('door-opening', { volume: 0.4 });
  }

  openDoor() {
    this.openSound.play();
    this.play('castle-door', true);
  }
}

export default Door;

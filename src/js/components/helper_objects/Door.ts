import * as Phaser from 'phaser';
import initAnims from '../animations/doorsAnims';

class Door extends Phaser.Physics.Arcade.Sprite {
  openSound: Phaser.Sound.BaseSound;
  key: string;

  constructor(scene:Phaser.Scene, x:number, y:number, key: string) {
    super(scene, x, y, 'doors');
    this.key = key;
    scene.add.existing(this);
    initAnims(this.scene.anims);
    this.play(`${this.key}-door-idle`, true);

    this.openSound = this.scene.sound.add('door-opening', { volume: 0.4 });
  }

  openDoor():void {
    this.openSound.play();
    this.play(`${this.key}-door`, true);
  }
}

export default Door;

import * as Phaser from 'phaser';
import initAnims from '../animations/doorsAnims';

const DOOR_VOLUME_LEVEL = 0.4;

class Door extends Phaser.Physics.Arcade.Sprite {
  openSound: Phaser.Sound.BaseSound;
  key: string;

  constructor(scene:Phaser.Scene, x:number, y:number, key: string) {
    super(scene, x, y, 'doors');
    this.key = key;
    scene.add.existing(this);
    initAnims(this.scene.anims);
    this.play(`${this.key}-door-idle`, true);

    this.openSound = this.scene.sound.add('door-opening', { volume: DOOR_VOLUME_LEVEL });
  }

  openDoor():void {
    this.openSound.play();
    this.play(`${this.key}-door`, true);
  }
}

export default Door;

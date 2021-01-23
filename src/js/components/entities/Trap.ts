import * as Phaser from 'phaser';
import initAnims from '../animations/trapsAnims';
import getTimestamp from '../utils/functions';
import anims from '../mixins/anims';

class Trap extends Phaser.Physics.Arcade.Sprite {
  attackSound: any;
  key: string;
  timeFromLastAttack: number;
  sleepTime: number;
  scene:Phaser.Scene;
  isPlayingAnims?: any;
  damage: number;
  isAttacking?: boolean;
  isSleeping?: boolean;
  // changeSize?: any;

  constructor(scene:Phaser.Scene, x:number, y:number, key: string) {
    super(scene, x, y, 'traps');
    this.key = key.toLowerCase();
    this.scene = scene;
    Object.assign(this, anims);
    this.init();
  }

  init():void {
    this.sleepTime = Phaser.Math.Between(1500, 4000);
    // this.attackSound = this.scene.sound.add(`${this.key}`, { volume: 0.2 });
    this.attackSound = this.scene.sound.add('fire-trap', { volume: 0.2 });
    this.isAttacking = false;
    this.scene.add.existing(this);
    initAnims(this.scene.anims);
    this.play(`${this.key}-idle`, true);
    this.setOrigin(0.5, 1);
    this.scene.physics.add.existing(this);
    this.timeFromLastAttack = getTimestamp();
  }

  changeSize():void {
    if (this.isAttacking) {
      this.setBodySize(30, 110);
      this.setOffset(50, 0);
    } else {
      this.setBodySize(30, 30);
      this.setOffset(50, 130);
    }
  }

  update():void {
    if (this.isPlayingAnims(`${this.key}`) || this.isPlayingAnims(`${this.key}-rising`)) {
      return;
    }

    if (this.isSleeping) {
      if (this.sleepTime < getTimestamp() - this.timeFromLastAttack) {
        this.isSleeping = false;
        this.play(`${this.key}-rising`, true);
        this.timeFromLastAttack = getTimestamp();
      }
      return;
    }

    if (this.timeFromLastAttack && (this.sleepTime) < getTimestamp() - this.timeFromLastAttack) {
      this.isAttacking = true;
      this.changeSize();
      this.play(`${this.key}`, true);
      this.attackSound.play();
      this.timeFromLastAttack = getTimestamp();
      return;
    }
    this.isAttacking = false;
    this.changeSize();
    this.play(`${this.key}-idle`, true);
  }
}

export default Trap;

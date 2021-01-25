import * as Phaser from 'phaser';
import initAnims from '../animations/trapsAnims';
import { getTimestamp } from '../utils/functions';
import anims from '../mixins/anims';
import Player from './Player';

class Trap extends Phaser.Physics.Arcade.Sprite {
  attackSound: any;
  key: string;
  player: Player;
  x: number;
  y: number;
  playSoundDistance: number;
  timeFromLastStateChange: number;
  sleepTime: number;
  attackTime?: number;
  scene:Phaser.Scene;
  isPlayingAnims?: any;
  damage: number;
  isAttacking?: boolean;

  constructor(scene:Phaser.Scene, x:number, y:number, key: string, player: Player) {
    super(scene, x, y, 'traps');
    this.key = key.toLowerCase();
    this.player = player;
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.playSoundDistance = 600;
    Object.assign(this, anims);
    this.init();
  }

  init():void {
    this.sleepTime = Phaser.Math.Between(1500, 4000);
    this.attackTime = 0;
    this.attackSound = this.scene.sound.add(`${this.key}`, { volume: 0.2 });
    // this.attackSound = this.scene.sound.add('fire-trap', { volume: 0.2 });
    this.isAttacking = false;
    this.scene.add.existing(this);
    initAnims(this.scene.anims);
    this.play(`${this.key}-idle`, true);
    this.setOrigin(0.5, 1);
    this.scene.physics.add.existing(this);
    this.timeFromLastStateChange = getTimestamp();
  }

  shouldSleep():boolean {
    return (this.sleepTime > getTimestamp() - this.timeFromLastStateChange);
  }

  shouldStayActive():boolean {
    return (this.attackTime > getTimestamp() - this.timeFromLastStateChange);
  }

  sleep():void {
    this.setBodySize(30, 30);
    this.setOffset(50, 130);
    this.play(`${this.key}-sleep`, true);
  }

  isPlayerComing():boolean {
    const playerCenter = this.player.getCenter();
    return (Math.abs(playerCenter.x - this.x) <= this.playSoundDistance);
  }

  activate():void {
    this.setBodySize(30, 110);
    this.setOffset(50, 0);
    this.play(`${this.key}`, true);
    if (this.isPlayerComing()) {
      this.attackSound.play();
    }
    this.isAttacking = true;
  }

  attack():void {
    this.play(`${this.key}-idle`, true);
  }

  deactivate():void {
    this.isAttacking = false;
  }

  update():void {
    if (this.isPlayingAnims(`${this.key}`) || this.isPlayingAnims(`${this.key}-hiding`)) {
      return;
    }

    if (this.shouldSleep() && !this.isAttacking) {
      this.sleep();
      return;
    }

    if (this.isAttacking) {
      if (this.shouldStayActive()) {
        this.attack();
        return;
      }
        this.deactivate();
        this.timeFromLastStateChange = getTimestamp();
        return;
    }

    this.activate();
    this.timeFromLastStateChange = getTimestamp();
  }
}

export default Trap;

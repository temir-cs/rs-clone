import * as Phaser from 'phaser';
import initAnims from '../animations/trapsAnims';
import { getTimestamp } from '../utils/functions';
import anims from '../mixins/anims';
import Player from './Player';
import {
  TRAP_ACTIVE_BODY_HEIGHT,
  TRAP_ACTIVE_OFFSET_Y,
  TRAP_ATTACK_SOUND_VOLUME,
  TRAP_OFFSET_X,
  TRAP_SLEEP_BODY_WIDTH,
  TRAP_SLEEP_OFFSET_Y,
  TRAP_SLEEP_TIME_LOWER_BOUND,
  TRAP_SLEEP_TIME_UPPER_BOUND,
} from './consts';

class Trap extends Phaser.Physics.Arcade.Sprite {
  attackSound: Phaser.Sound.BaseSound;
  key: string;
  player: Player;
  x: number;
  y: number;
  playSoundDistance: number;
  timeFromLastStateChange: number;
  sleepTime: number;
  attackTime?: number;
  scene:Phaser.Scene;
  isPlayingAnims?: (key:string) => boolean;
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
    this.sleepTime = Phaser.Math.Between(TRAP_SLEEP_TIME_LOWER_BOUND, TRAP_SLEEP_TIME_UPPER_BOUND);
    this.attackTime = 0;
    this.attackSound = this.scene.sound.add(`${this.key}`, { volume: TRAP_ATTACK_SOUND_VOLUME });
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
    this.setBodySize(TRAP_SLEEP_BODY_WIDTH, TRAP_SLEEP_BODY_WIDTH);
    this.setOffset(TRAP_OFFSET_X, TRAP_SLEEP_OFFSET_Y);
    this.play(`${this.key}-sleep`, true);
  }

  isPlayerComing():boolean {
    const playerCenter = this.player.getCenter();
    return (Math.abs(playerCenter.x - this.x) <= this.playSoundDistance);
  }

  activate():void {
    this.setBodySize(TRAP_SLEEP_BODY_WIDTH, TRAP_ACTIVE_BODY_HEIGHT);
    this.setOffset(TRAP_OFFSET_X, TRAP_ACTIVE_OFFSET_Y);
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

import Trap from './Trap';
import {
  SPIKETRAP_SLEEP_TIME_LOWER_BOUND,
  SPIKETRAP_SLEEP_TIME_UPPER_BOUND,
  SPIKETRAP_ATTACK_TIME_LOWER_BOUND,
  SPIKETRAP_ATTACK_TIME_UPPER_BOUND,
  SPIKETRAP_ORIGIN_X,
  SPIKETRAP_ORIGIN_Y,
  SPIKETRAP_BODY_WIDTH,
  SPIKETRAP_BODY_HEIGHT,
  SPIKETRAP_OFFSET_X,
  SPIKETRAP_OFFSET_Y,
  SPIKETRAP_SLEEP_BODY_WIDTH,
  SPIKETRAP_SLEEP_BODY_HEIGHT,
  SPIKETRAP_SLEEP_OFFSET_Y,
  SPIKETRAP_ACTIVE_BODY_HEIGHT,
  SPIKETRAP_ACTIVE_OFFSET_Y,
  TRAP_DEFAULT_DAMAGE,
} from './consts';

class SpikesTrap extends Trap {
  isSleeping: boolean;

  init():void {
    super.init();
    this.damage = TRAP_DEFAULT_DAMAGE;
    this.sleepTime = Phaser.Math.Between(SPIKETRAP_SLEEP_TIME_LOWER_BOUND, SPIKETRAP_SLEEP_TIME_UPPER_BOUND);
    this.attackTime = Phaser.Math.Between(SPIKETRAP_ATTACK_TIME_LOWER_BOUND, SPIKETRAP_ATTACK_TIME_UPPER_BOUND);

    this.setOrigin(SPIKETRAP_ORIGIN_X, SPIKETRAP_ORIGIN_Y);
    this.setBodySize(SPIKETRAP_BODY_WIDTH, SPIKETRAP_BODY_HEIGHT);
    this.setOffset(SPIKETRAP_OFFSET_X, SPIKETRAP_OFFSET_Y);
  }

  sleep():void {
    super.sleep();
    this.setBodySize(SPIKETRAP_SLEEP_BODY_WIDTH, SPIKETRAP_SLEEP_BODY_HEIGHT);
    this.setOffset(SPIKETRAP_OFFSET_X, SPIKETRAP_SLEEP_OFFSET_Y);
  }

  activate():void {
    super.activate();
    this.setBodySize(SPIKETRAP_SLEEP_BODY_WIDTH, SPIKETRAP_ACTIVE_BODY_HEIGHT);
    this.setOffset(SPIKETRAP_OFFSET_X, SPIKETRAP_ACTIVE_OFFSET_Y);
  }

  deactivate():void {
    super.deactivate();
    this.play(`${this.key}-hiding`, true);
  }
}

export default SpikesTrap;

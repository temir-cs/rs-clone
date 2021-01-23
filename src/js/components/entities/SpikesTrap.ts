import Trap from './Trap';

class SpikesTrap extends Trap {
  isSleeping: boolean;

  init():void {
    super.init();
    this.damage = 10;
    this.sleepTime = Phaser.Math.Between(2000, 3000);
    this.attackTime = Phaser.Math.Between(1000, 3000);

    this.setOrigin(0.5, 0.75);
    this.setBodySize(72, 64);
    this.setOffset(29, 40);
  }

  sleep():void {
    super.sleep();
    this.setBodySize(70, 1);
    this.setOffset(29, 110);
  }

  activate():void {
    super.activate();
    this.setBodySize(70, 64);
    this.setOffset(29, 47);
  }

  deactivate():void {
    super.deactivate();
    this.play(`${this.key}-hiding`, true);
  }
}

export default SpikesTrap;

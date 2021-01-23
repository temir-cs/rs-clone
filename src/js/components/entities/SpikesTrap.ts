import Trap from './Trap';

class SpikesTrap extends Trap {
  isSleeping: boolean;

  init() {
    super.init();
    this.damage = 10;
    this.isSleeping = false;
    this.sleepTime = Phaser.Math.Between(2000, 3000);

    this.setOrigin(0.5, 0.75);
    this.setBodySize(72, 64);
    this.setOffset(29, 40);
  }

  changeSize():void {
    if (this.isAttacking) {
      this.setBodySize(70, 1);
      this.setOffset(29, 110);
      this.isSleeping = true;
    } else {
      this.setBodySize(70, 64);
      this.setOffset(29, 47);
      this.isSleeping = false;
    }
  }
}

export default SpikesTrap;

import Enemy from './Enemy';

import initAnims from '../animations/impAnim';

class Imp extends Enemy {
  isDead: boolean;
  constructor(scene:Phaser.Scene, x:number, y:number) {
    super(scene, x, y, 'imp');

    this.setBodySize(35, 60);
    this.setOffset(100, 100);
    initAnims(this.scene.anims);
    this.isDead = false;
  }

  init() {
    super.init();
    this.speed = 50;
  }

  update(time:number, delta:number):void {
    super.update(time, delta);
    if (!this.active) return;
    if (this.isPlayingAnims('imp-hurt') || this.isPlayingAnims('imp-death')) { return; }
    if (this.isDead) {
      this.setActive(false);
      this.play('imp-dead', true);
      setTimeout(() => {
        this.rayGraphics.clear();
        this.destroy();
      }, 400);
      return;
    }
    this.setVelocityX(this.speed);
    this.play('imp-walk', true);
  }

  takesHit(source):void {
    super.takesHit(source);
    this.setVelocityX(this.speed * 0.1);
    this.play('imp-hurt', true);

    if (this.health <= 0) {
      this.play('imp-death', true);
      this.setVelocityX(0);
      this.isDead = true;
    }
  }
}

export default Imp;

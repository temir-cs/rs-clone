import Enemy from './Enemy';

import initAnims from '../animations/trollAnim';

class Troll extends Enemy {
  isDead: boolean;
  constructor(scene:Phaser.Scene, x:number, y:number) {
    super(scene, x, y, 'troll');

    this.setBodySize(40, 50);
    this.setOffset(35, 38);
    initAnims(this.scene.anims);
    this.isDead = false;
  }

  update(time:number, delta:number):void {
    super.update(time, delta);
    if (!this.active) return;
    if (this.isPlayingAnims('troll-hurt') || this.isPlayingAnims('troll-death')) { return; }
    if (this.isDead) {
      this.setActive(false);
      this.play('troll-dead', true);
      setTimeout(() => {
        this.rayGraphics.clear();
        this.destroy();
      }, 400);
      return;
    }
    this.setVelocityX(this.speed);
    this.play('troll-idle', true);
  }

  takesHit(source):void {
    super.takesHit(source);
    this.setVelocityX(this.speed * 0.1);
    this.play('troll-hurt', true);

    if (this.health <= 0) {
      this.play('troll-death', true);
      this.setVelocityX(0);
      this.isDead = true;
    }
  }
}

export default Troll;

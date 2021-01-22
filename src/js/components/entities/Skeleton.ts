import Enemy from './Enemy';

import initAnims from '../animations/skeletonAnims';

class Skeleton extends Enemy {
  isDead: boolean;
  constructor(scene:Phaser.Scene, x:number, y:number) {
    super(scene, x, y, 'skeleton');
    this.speed = 60;
    this.setBodySize(40, 70);
    this.setOrigin(0, 0);
    this.setOffset(20, 30);
    initAnims(this.scene.anims);
    this.isDead = false;
  }

  update(time:number, delta:number):void {
    super.update(time, delta);

    if (!this.active) return;
    if (this.isPlayingAnims('skeleton-hurt') || this.isPlayingAnims('skeleton-death')) { return; }
    if (this.isDead) {
      this.setActive(false);
      this.play('skeleton-dead', true);
      setTimeout(() => {
        this.rayGraphics.clear();
        this.destroy();
      }, 400);
      return;
    }
    this.setVelocityX(this.speed);
    this.play('skeleton-walk', true);
  }

  takesHit(source):void {
    super.takesHit(source);
    this.setVelocityX(this.speed * 0.1);
    this.play('skeleton-hurt', true);

    if (this.health <= 0) {
      this.play('skeleton-death', true);
      this.setVelocityX(0);
      this.isDead = true;
    }
  }
}

export default Skeleton;

import Enemy from './Enemy';

import initAnims from '../animations/trollAnim';

class Troll extends Enemy {
  constructor(scene:Phaser.Scene, x:number, y:number) {
    super(scene, x, y, 'troll');

    this.setSize(24, 50);
    this.setOffset(46, 38);
    initAnims(this.scene.anims);
  }

  update(time:number, delta:number):void {
    super.update(time, delta);
    if (!this.active) return;
    if (this.isPlayingAnims('troll-hurt')) { return; }
    this.setVelocityX(this.speed);
    this.play('troll-idle', true);
  }

  takesHit(source):void {
    super.takesHit(source);
    this.setVelocityX(this.speed * 0.1);
    this.play('troll-hurt', true);
  }
}

export default Troll;

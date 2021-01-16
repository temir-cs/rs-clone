import Enemy from './Enemy';

import initAnims from '../animations/trollAnim';

class Troll extends Enemy {
  constructor(scene, x:number, y:number) {
    super(scene, x, y, 'troll');

    this.setSize(24, 50);
    this.setOffset(46, 38)
    initAnims(this.scene.anims);
  }

  update(time:number, delta:number):void {
    super.update(time, delta);
    if (!this.active) return;
    this.play('troll-idle', true);
  }
}

export default Troll;

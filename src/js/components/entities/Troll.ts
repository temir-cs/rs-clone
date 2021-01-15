import Enemy from './Enemy';

import initAnims from '../animations/trollAnim';

class Troll extends Enemy {
  constructor(scene, x:number, y:number) {
    super(scene, x, y, 'troll');

    this.setOffset(30, 35);
    initAnims(this.scene.anims);
  }

  update(time:number, delta:number):void {
    super.update(time, delta);
    this.play('troll-idle', true);
  }
}

export default Troll;

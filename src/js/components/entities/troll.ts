import Enemy from './enemy';

import initAnims from '../animations/trollAnim';

class Troll extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'troll');

    initAnims(this.scene.anims);
  }

  update(time, delta) {
    super.update(time, delta);
    this.play('troll-idle', true);
  }
}

export default Troll;

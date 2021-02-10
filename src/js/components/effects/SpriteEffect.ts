import * as Phaser from 'phaser';
import { BOSS_TARGET_EFFECT_OFFSET_X } from '../entities/consts';

class SpriteEffect extends Phaser.Physics.Arcade.Sprite {
  scene: Phaser.Scene;
  target: Phaser.Physics.Arcade.Sprite;
  effectName: string;
  impactPosition: {x: number, y: number};

  constructor(scene:Phaser.Scene, x:number, y:number, effectName:string, impactPosition: {x: number, y: number}) {
    super(scene, x, y, null);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.target = null;
    this.effectName = effectName;
    this.impactPosition = impactPosition;

    this.on('animationcomplete', (animation) => {
      if (animation.key === this.effectName) {
        this.destroy();
      }
    }, this);
  }

  preUpdate(time: number, delta: number):void {
    super.preUpdate(time, delta);
    this.placeEffect();
  }

  placeEffect():void {
    if (!this.target || !this.body) { return; }
    const center = this.target.getCenter();
    if (this.target.name === 'boss') center.x -= BOSS_TARGET_EFFECT_OFFSET_X;
    this.body.reset(center.x, this.impactPosition.y);
  }

  playOn(target: Phaser.Physics.Arcade.Sprite):void {
    this.target = target;
    this.play(this.effectName, true);
    this.placeEffect();
  }
}

export default SpriteEffect;

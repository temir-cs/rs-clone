import * as Phaser from 'phaser';

class SpriteEffect extends Phaser.Physics.Arcade.Sprite {
  scene: Phaser.Scene;
  target: Phaser.Physics.Arcade.Sprite;
  effectName: string;
  impactPosition: any;

  constructor(scene:Phaser.Scene, x:number, y:number, effectName:string, impactPosition: any) {
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

  preUpdate(time, delta):void {
    super.preUpdate(time, delta);
    this.placeEffect();
  }

  placeEffect():void {
    if (!this.target || !this.body) { return; }
    const center = this.target.getCenter();
    this.body.reset(center.x, this.impactPosition.y);
  }

  playOn(target: Phaser.Physics.Arcade.Sprite):void {
    this.target = target;
    this.play(this.effectName, true);
    this.placeEffect();
  }
}

export default SpriteEffect;
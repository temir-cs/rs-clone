import SpriteEffect from './SpriteEffect';

class EffectManager {
  scene: Phaser.Scene;

  constructor(scene:Phaser.Scene) {
    this.scene = scene;
  }

  playEffectOn(effectName: string, target: Phaser.Physics.Arcade.Sprite, impactPosition: any):void {
    const effect = new SpriteEffect(this.scene, 0, 0, effectName, impactPosition);
    effect.playOn(target);
  }
}

export default EffectManager;

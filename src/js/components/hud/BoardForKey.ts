import * as Phaser from 'phaser';

class ScoreBoard {
  scene: Phaser.Scene;
  keyImage: Phaser.GameObjects.Image;
  x: number;
  y: number;

  constructor(scene) {
    this.scene = scene;
    const { rightTopCorner } = scene.config;

    this.x = rightTopCorner.x - 20;
    this.y = rightTopCorner.y + 40;
    this.keyImage = this.scene.add.image(this.x, this.y, 'key-static')
        .setOrigin(1, 0)
        .setScale(1.2);
    this.keyImage.setTintFill(0xffffff);
    this.keyImage.setAlpha(0.6);
    this.keyImage.setScrollFactor(0);
  }

  activateKey():void {
    this.keyImage.clearAlpha();
    this.keyImage.clearTint();
  }
}

export default ScoreBoard;

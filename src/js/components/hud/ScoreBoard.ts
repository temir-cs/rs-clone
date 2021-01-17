import * as Phaser from 'phaser';

class ScoreBoard {
  fontSize?: number;
  containerWidth?: number;
  scene: Phaser.Scene;
  scoreText: Phaser.GameObjects.Text;
  scoreImage: Phaser.GameObjects.Image;

  constructor(scene) {
    this.scene = scene;
    const { rightTopCorner } = scene.config;
    this.fontSize = 32;
    this.containerWidth = 80;

    this.scoreImage = this.scene.add.image(rightTopCorner.x - this.containerWidth, rightTopCorner.y + 4, 'coin-static')
        .setOrigin(0)
        .setScale(1);
    this.scoreText = this.scene.add.text(0, 0, '0', { fontSize: `${this.fontSize}px`, color: '#000' });
    this.scoreText.setPosition(this.scoreImage.x + this.scoreImage.width + 3, this.scoreImage.y + 2);
    this.scoreText.setScrollFactor(0);
    this.scoreImage.setScrollFactor(0);
  }

  updateScoreBoard(score) {
    this.scoreText.setText(score);
  }
}

export default ScoreBoard;

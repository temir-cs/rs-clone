import * as Phaser from 'phaser';

class ScoreBoard {
  fontSize?: number;
  containerWidth?: number;
  scene: Phaser.Scene;
  scoreText: Phaser.GameObjects.Text;
  scoreImage: Phaser.GameObjects.Image;
  livesImage: Phaser.GameObjects.Image;
  coinCount: number;
  lives: any;
  stats: any;
  leftTopCorner: any;

  constructor(scene) {
    this.scene = scene;
    const { rightTopCorner } = scene.config;
    this.leftTopCorner = scene.config.leftTopCorner;
    this.fontSize = 24;
    this.containerWidth = 80;
    this.stats = this.scene.registry.get('stats');
    this.lives = this.scene.registry.get('livesCount');
    this.coinCount = this.stats ? this.stats.coins : 0;

    this.lives = [];
    this.scoreImage = this.scene.add.image(rightTopCorner.x - this.containerWidth, rightTopCorner.y + 4, 'coin-static')
        .setOrigin(0)
        .setScale(1);
    this.scoreText = this.scene.add.text(this.scoreImage.x + this.scoreImage.width + 3, this.scoreImage.y + 2, `${this.coinCount}`, { fontFamily: '"Press Start 2P"', fontSize: `${this.fontSize}px`, color: '#000' });
    this.scoreText.setScrollFactor(0);
    this.scoreImage.setScrollFactor(0);
  }

  renderLives(lives) {
    this.lives.forEach((healthImage) => healthImage.destroy());

    for (let i = 0; i < lives; i += 1) {
      this.lives.push(this.scene.add.image(this.leftTopCorner.x + (i * 30 + 10), this.leftTopCorner.y + 30, 'heart-static')
        .setOrigin(0)
        .setScrollFactor(0));
    }
    console.log(this.lives);
  }

  updateScoreBoard(score) {
    this.scoreText.setText(score);
  }
}

export default ScoreBoard;

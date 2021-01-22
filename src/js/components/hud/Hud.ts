import * as Phaser from 'phaser';
import Play from '../scenes/Play';

class Hud {
  fontSize?: number;
  containerWidth?: number;
  scene: Phaser.Scene;
  coinsText: Phaser.GameObjects.Text;
  avatar: Phaser.GameObjects.Image;
  coinsImage: Phaser.GameObjects.Image;
  livesImage: Phaser.GameObjects.Image;
  keyImage: Phaser.GameObjects.Image;
  coinCount: number;
  // ARRAY
  lives: any;
  // OBJECTS
  stats: any;
  leftTopCorner: any;
  rightTopCorner: any;
  hudFont: any;

  constructor(scene:Play) {
    this.scene = scene;
    this.rightTopCorner = scene.config.rightTopCorner;
    this.leftTopCorner = scene.config.leftTopCorner;
    this.hudFont = {
      fontSize: '24px',
      fontStyle: 'normal',
      fontFamily: '"Press Start 2P"',
      fill: '#fff',
    };
    this.avatar = null;
    this.lives = [];
    this.keyImage = this.scene.add.image(this.rightTopCorner.x - 20, this.rightTopCorner.y + 40, 'key-static')
        .setOrigin(1, 0)
        .setScale(1.2)
        .setTintFill(0xffffff)
        .setAlpha(0.6)
        .setScrollFactor(0);
    this.stats = scene.getCurrentStats();
    this.coinCount = this.stats.coins;
    this.coinsImage = this.scene.add.image(this.rightTopCorner.x - 80, this.rightTopCorner.y + 4, 'coin-static')
        .setOrigin(0)
        .setScale(1)
        .setScrollFactor(0);
    const coinsTextPosition = [this.coinsImage.x + this.coinsImage.width + 5, this.coinsImage.y + 7];
    this.coinsText = this.scene.add.text(coinsTextPosition[0], coinsTextPosition[1], `${this.coinCount}`, this.hudFont)
      .setScrollFactor(0);
  }

  renderAvatar(hero:string):void {
    this.avatar = this.scene.add.image(this.leftTopCorner.x + 10, this.leftTopCorner.y + 10, `${hero}-avatar`)
      .setOrigin(0)
      .setScrollFactor(0);
  }

  renderLives(lives:number):void {
    this.lives.forEach((healthImage) => healthImage.destroy());

    for (let i = 0; i < lives; i += 1) {
      this.lives
        .push(this.scene.add.image(this.leftTopCorner.x + this.avatar.width + 10 + (i * 30), this.leftTopCorner.y + 30, 'heart-static')
        .setOrigin(0)
        .setScrollFactor(0));
    }
  }

  updateScoreBoard(score):void {
    this.coinsText.setText(score);
  }

  activateKey():void {
    this.keyImage.clearAlpha();
    this.keyImage.clearTint();
  }
}

export default Hud;

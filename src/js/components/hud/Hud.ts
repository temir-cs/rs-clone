import * as Phaser from 'phaser';
import Play from '../scenes/Play';
import { Stats, FontConfig } from '../interfaces/interfaces';

import {
  HUD_KEY_IMAGE_SCALE,
  HUD_KEY_IMAGE_INIALPHA,
  HUD_KEY_IMAGE_X_SHIFT,
  HUD_KEY_IMAGE_Y_SHIFT,
  HUD_COIN_IMAGE_X_SHIFT,
  HUD_COIN_IMAGE_Y_SHIFT,
  HUD_COIN_TXT_Y_SHIFT,
  HUD_AVA_IMAGE_X_SHIFT,
  HUD_AVA_IMAGE_Y_SHIFT,
  HUD_HEART_IMAGE_WIDTH,
  HUD_HEART_IMAGE_X_SHIFT,
  HUD_HEART_IMAGE_Y_SHIFT,
  HEALTH_BAR_COLOR_WHITE
} from './consts';

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
  lives: Array<Phaser.GameObjects.Image>;
  stats: Stats;
  leftTopCorner: {x: number, y: number};
  rightTopCorner: {x: number, y: number};
  hudFont: FontConfig;

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
    this.keyImage = this.scene.add.image(this.rightTopCorner.x + HUD_KEY_IMAGE_X_SHIFT, this.rightTopCorner.y + HUD_KEY_IMAGE_Y_SHIFT, 'key-static')
        .setOrigin(1, 0)
        .setScale(HUD_KEY_IMAGE_SCALE)
        .setTintFill(HEALTH_BAR_COLOR_WHITE)
        .setAlpha(HUD_KEY_IMAGE_INIALPHA)
        .setScrollFactor(0);
    this.stats = scene.getCurrentStats();
    this.coinCount = this.stats.coins;
    this.coinsImage = this.scene.add.image(this.rightTopCorner.x + HUD_COIN_IMAGE_X_SHIFT, this.rightTopCorner.y + HUD_COIN_IMAGE_Y_SHIFT, 'coin-static')
        .setOrigin(0)
        .setScale(1)
        .setScrollFactor(0);
    const coinsTextPosition = [this.coinsImage.x + this.coinsImage.width, this.coinsImage.y + HUD_COIN_TXT_Y_SHIFT];
    this.coinsText = this.scene.add.text(coinsTextPosition[0], coinsTextPosition[1], `${this.coinCount}`, this.hudFont)
      .setScrollFactor(0);
  }

  renderAvatar(hero:string):void {
    this.avatar = this.scene.add.image(this.leftTopCorner.x + HUD_AVA_IMAGE_X_SHIFT,
                                      this.leftTopCorner.y + HUD_AVA_IMAGE_Y_SHIFT, `${hero}-avatar`)
      .setOrigin(0)
      .setScrollFactor(0);
  }

  renderLives(lives:number):void {
    this.lives.forEach((healthImage) => healthImage.destroy());

    for (let i = 0; i < lives; i += 1) {
      this.lives
        .push(this.scene.add.image(this.leftTopCorner.x + this.avatar.width + HUD_HEART_IMAGE_X_SHIFT + (i * HUD_HEART_IMAGE_WIDTH), this.leftTopCorner.y + HUD_HEART_IMAGE_Y_SHIFT, 'heart-static')
        .setOrigin(0)
        .setScrollFactor(0));
    }
  }

  updateScoreBoard(score:number):void {
    this.coinsText.setText(`${score}`);
  }

  activateKey():void {
    this.keyImage.clearAlpha();
    this.keyImage.clearTint();
  }
}

export default Hud;

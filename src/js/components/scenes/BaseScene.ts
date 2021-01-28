import * as Phaser from 'phaser';
import { SceneConfig, FontConfig, MenuType } from '../interfaces/interfaces';

class BaseScene extends Phaser.Scene {
  config: SceneConfig;
  screenCenter: Array<number>;
  fontSize: number;
  fontStyle: string;
  lineHeight: number;
  fontOptions: FontConfig;
  fontFamily: string;

  constructor(key: string, config: SceneConfig) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
    this.fontSize = 52;
    this.fontStyle = 'bold';
    this.fontFamily = '"Press Start 2P"';
    this.lineHeight = 70;
    this.fontOptions = {
      fontSize: `${this.fontSize}px`,
      fontStyle: this.fontStyle,
      fontFamily: this.fontFamily,
      fill: '#fff',
    };
  }

  create():void {
    this.add.image(0, 0, 'menu-bg')
      .setScale(2.5)
      .setOrigin(0, 0.4);

    if (this.config.canGoBack) {
      const backButton = this.add.image(this.config.width - 20, this.config.height - 20, 'back')
        .setInteractive()
        .setOrigin(1, 1);

        backButton.on('pointerup', () => {
          this.scene.start('MenuScene');
        });

        backButton.on('pointerover', () => {
          backButton.setTint(0x0FFF00);
        });

        backButton.on('pointerout', () => {
          backButton.clearTint();
        });
    }
  }

  createMenu(menu: MenuType[], setupMenuEvents: (menuItem: MenuType)=>void):void {
    let lastMenuPositionY = 0;
    menu.forEach((item) => {
      const menuItem = item;
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
      menuItem.textGameObject = this.add.text(menuPosition[0], menuPosition[1], menuItem.text, this.fontOptions).setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    });
  }
}

export default BaseScene;

import * as Phaser from 'phaser';
import { SceneConfig, FontConfig, MenuType } from '../interfaces/interfaces';

import {
  GAME_MENU_FONT,
  GAME_MENU_LINE_HEIGHT,
  CENTER_POSITION_DIVIDER,
  BACK_BTN_SHIFT,
  MENU_BG_SCALE,
  MENU_ORIGIN_Y,
  TEXT_HOVER_COLOR
} from './consts';

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
    this.screenCenter = [config.width / CENTER_POSITION_DIVIDER, config.height / CENTER_POSITION_DIVIDER];
    this.fontSize = GAME_MENU_FONT;
    this.fontStyle = 'bold';
    this.fontFamily = '"Press Start 2P"';
    this.lineHeight = GAME_MENU_LINE_HEIGHT;
    this.fontOptions = {
      fontSize: `${this.fontSize}px`,
      fontStyle: this.fontStyle,
      fontFamily: this.fontFamily,
      fill: '#fff',
    };
  }

  create():void {
    this.add.image(0, 0, 'menu-bg')
      .setScale(MENU_BG_SCALE)
      .setOrigin(0, MENU_ORIGIN_Y);

    if (this.config.canGoBack) {
      const backButton = this.add.image(this.config.width - BACK_BTN_SHIFT, this.config.height - BACK_BTN_SHIFT, 'back')
        .setInteractive()
        .setOrigin(1, 1);

        backButton.on('pointerup', () => {
          this.scene.start('MenuScene');
        });

        backButton.on('pointerover', () => {
          backButton.setTint(TEXT_HOVER_COLOR);
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

import Menu from './Menu';
import { requestToServer } from '../routes/utils';
import { SceneConfig, FontConfig, MenuType } from '../interfaces/interfaces';
import { getCurrentLanguageDictionary } from '../utils/functions';
import {
  LARGE_FONT,
  SMALL_FONT,
  GAMEOVER_TEXT_Y_SHIFT,
  GAMEOVER_MENU_X_SHIFT,
  GAMEOVER_MENU_Y_SHIFT,
  GAMEOVER_MENU_DEPTH,
  GAMEOVER_MENU_LAST_Y_SHIFT
  } from './consts';

class GameOver extends Menu {
  menu: MenuType[];
  largeFont: number;
  smallFont: number;
  totalCoins: number;
  totalKills: number;
  music: Phaser.Sound.BaseSound;
  constructor(config: SceneConfig, sceneName: string) {
    super(config, sceneName);

    const dictionary = getCurrentLanguageDictionary();

    this.menu = [
      { scene: 'HeroSelectScene', text: `${dictionary.GameOverScene.newGame}` },
      { scene: 'MenuScene', text: `${dictionary.GameOverScene.mainMenu}` },
    ];

    this.music = null;
    this.largeFont = LARGE_FONT;
    this.smallFont = SMALL_FONT;
    this.totalCoins = 0;
    this.totalKills = 0;
  }

  create():void {
    super.create();
    const stats = this.registry.get('finalStats');
    const user = localStorage.getItem('user');
    requestToServer({ ...stats, username: user }, 'leaderboard');
    this.totalCoins = stats.coins;
    this.totalKills = stats.kills;
  }

  displayStats(xOffset:number, yOffset: number):void {
    const dict = getCurrentLanguageDictionary();
    const [x, y] = this.screenCenter;
    this.add.text(x - xOffset, y + yOffset, `${dict.GameOverScene.totalCoins}`, this.getFontOptions(this.smallFont)).setOrigin(0.5, 0.5);
    this.add.text(x + xOffset, y + yOffset, `${this.totalCoins}`, this.getFontOptions(this.smallFont)).setOrigin(0.5, 0.5);
    this.add.text(x - xOffset, y + yOffset + GAMEOVER_TEXT_Y_SHIFT, `${dict.GameOverScene.totalKills}`,
          this.getFontOptions(this.smallFont)).setOrigin(0.5, 0.5);
    this.add.text(x + xOffset, y + yOffset + GAMEOVER_TEXT_Y_SHIFT, `${this.totalKills}`,
          this.getFontOptions(this.smallFont)).setOrigin(0.5, 0.5);
  }

  getFontOptions(fontSize: number):FontConfig {
    return {
      fontSize: `${fontSize}px`,
      fontStyle: this.fontStyle,
      fontFamily: this.fontFamily,
      fill: '#fff',
    };
  }

  createMenu(menu: MenuType[], setupMenuEvents: (menuItem: MenuType)=>void):void {
    let lastMenuPositionY = 0;
    menu.forEach((item) => {
      const menuItem = item;
      const menuPosition = [this.screenCenter[0] + GAMEOVER_MENU_X_SHIFT + lastMenuPositionY, this.screenCenter[1] + GAMEOVER_MENU_Y_SHIFT];
      menuItem.textGameObject = this.add.text(menuPosition[0], menuPosition[1], menuItem.text, this.getFontOptions(this.largeFont))
        .setOrigin(0.5, 1)
        .setDepth(GAMEOVER_MENU_DEPTH);
      lastMenuPositionY += GAMEOVER_MENU_LAST_Y_SHIFT;
      setupMenuEvents(menuItem);
    });
  }
}

export default GameOver;

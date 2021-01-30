import Menu from './Menu';
import { requestToServer } from '../routes/utils';
import { SceneConfig, FontConfig, MenuType } from '../interfaces/interfaces';
import { DEFAULT_STATS } from './consts';

class GameOver extends Menu {
  menu: MenuType[];
  largeFont: number;
  smallFont: number;
  totalCoins: number;
  totalKills: number;
  music: Phaser.Sound.BaseSound;
  constructor(config: SceneConfig, sceneName: string) {
    super(config, sceneName);

    this.menu = [
      { scene: 'HeroSelectScene', text: 'New Game' },
      { scene: 'MenuScene', text: 'Main menu' },
    ];

    this.music = null;
    this.largeFont = 32;
    this.smallFont = 24;
    this.totalCoins = 0;
    this.totalKills = 0;
  }

  create():void {
    super.create();
    const stats = this.registry.get('lastLevelStats') || DEFAULT_STATS;
    const user = localStorage.getItem('user');
    requestToServer({ ...stats, username: user }, 'leaderboard');
    this.totalCoins = stats.coins;
    this.totalKills = stats.kills;
  }

  displayStats(xOffset:number, yOffset: number):void {
    const [x, y] = this.screenCenter;
    this.add.text(x - xOffset, y + yOffset, 'Coins', this.getFontOptions(this.smallFont)).setOrigin(0.5, 0.5);
    this.add.text(x + xOffset, y + yOffset, `${this.totalCoins}`, this.getFontOptions(this.smallFont)).setOrigin(0.5, 0.5);
    this.add.text(x - xOffset, y + yOffset + 40, 'Kills', this.getFontOptions(this.smallFont)).setOrigin(0.5, 0.5);
    this.add.text(x + xOffset, y + yOffset + 40, `${this.totalKills}`, this.getFontOptions(this.smallFont)).setOrigin(0.5, 0.5);
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
      const menuPosition = [this.screenCenter[0] - 200 + lastMenuPositionY, this.screenCenter[1] + 220];
      menuItem.textGameObject = this.add.text(menuPosition[0], menuPosition[1], menuItem.text, this.getFontOptions(this.largeFont))
        .setOrigin(0.5, 1)
        .setDepth(2);
      lastMenuPositionY += 400;
      setupMenuEvents(menuItem);
    });
  }
}

export default GameOver;
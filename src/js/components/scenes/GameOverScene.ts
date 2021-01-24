import BaseScene from './BaseScene';
import { requestToServer } from '../routes/utils';

class GameOverScene extends BaseScene {
  menu: any;
  largeFont: any;
  smallFont: any;
  coinCount: number;
  killCount: number;
  constructor(config) {
    super('GameOverScene', config);

    this.menu = [
      { scene: 'HeroSelectScene', text: 'New Game' },
      { scene: 'MenuScene', text: 'Main menu' },
      { scene: null, text: 'Exit' }
    ];
  }

  create() {
    super.create();

    this.add.image(0, 0, 'game-over')
    .setOrigin(0, 0);

    this.createMenu(this.menu, (menuItem) => this.setupMenuEvents(menuItem));

    this.largeFont = {
      fontSize: '64px',
      fontStyle: this.fontStyle,
      fontFamily: this.fontFamily,
      fill: '#fff',
    };

    this.smallFont = {
      fontSize: '24px',
      fontStyle: this.fontStyle,
      fontFamily: this.fontFamily,
      fill: '#fff',
    };

    const stats = this.registry.get('finalStats');
    const user = localStorage.getItem('user');
    requestToServer({ ...stats, username: user }, 'leaderboard');
    const totalCoins = stats.coins;
    const totalKills = stats.kills;

    this.add.text(this.screenCenter[0], this.screenCenter[1] - 180, 'GAME OVER', this.largeFont).setOrigin(0.5, 0.5);

    this.add.text(this.screenCenter[0], this.screenCenter[1] - 180, 'GAME OVER', this.largeFont).setOrigin(0.5, 0.5);

    this.add.text(this.screenCenter[0] - 100, this.screenCenter[1] - 80, 'Coins', this.smallFont).setOrigin(0.5, 0.5);
    this.add.text(this.screenCenter[0] + 100, this.screenCenter[1] - 80, `${totalCoins}`, this.smallFont).setOrigin(0.5, 0.5);

    this.add.text(this.screenCenter[0] - 100, this.screenCenter[1] - 120, 'Kills', this.smallFont).setOrigin(0.5, 0.5);
    this.add.text(this.screenCenter[0] + 100, this.screenCenter[1] - 120, `${totalKills}`, this.smallFont).setOrigin(0.5, 0.5);
  }

  setupMenuEvents(menuItem):void {
    const { textGameObject } = menuItem;
    textGameObject.setInteractive();

    textGameObject.on('pointerover', () => {
      textGameObject.setStyle({ fill: '#FFA500' });
    });

    textGameObject.on('pointerout', () => {
      textGameObject.setStyle({ fill: '#fff' });
    });

    textGameObject.on('pointerup', () => {
      if (menuItem.scene) this.scene.start(menuItem.scene);

      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  }
}

export default GameOverScene;

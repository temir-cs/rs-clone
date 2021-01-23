import BaseScene from './BaseScene';
import { DEFAULT_STATS } from './consts';

class LevelsScene extends BaseScene {
  menu: any;
  levels: number;
  constructor(config) {
    super('LevelsScene', { ...config, canGoBack: true });

    // this.menu = [
    //   { scene: 'PlayScene', text: 'Level 1' },
    //   { scene: 'PlayScene', text: 'Level 2' },
    // ];
  }

  create() {
    super.create();

    this.menu = [];
    const levels = this.registry.get('unlocked-levels');
    for (let i = 1; i <= levels; i += 1) {
      this.menu.push({
        scene: 'HeroSelectScene', text: `Level ${i}`, level: i,
      });
    }

    this.createMenu(this.menu, (menuItem) => this.setupMenuEvents(menuItem));
  }

  setupMenuEvents(menuItem) {
    const { textGameObject } = menuItem;
    textGameObject.setInteractive();

    textGameObject.on('pointerover', () => {
      textGameObject.setStyle({ fill: '#FFA500' });
    });

    textGameObject.on('pointerout', () => {
      textGameObject.setStyle({ fill: '#fff' });
    });

    textGameObject.on('pointerup', () => {
      if (menuItem.scene) {
        this.registry.set('level', menuItem.level);
        this.scene.start(menuItem.scene, { gameStatus: 'NEW_GAME' });
      }

      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    });
  }
}

export default LevelsScene;

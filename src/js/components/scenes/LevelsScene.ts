import NavigationScene from './NavigationScene';

import { SceneConfig, MenuType } from '../interfaces/interfaces';

class LevelsScene extends NavigationScene {
  menu: MenuType[];
  levels: number;
  constructor(config: SceneConfig) {
    super(config, 'LevelsScene', true);
    this.menu = [
        { scene: 'HeroSelectScene', text: 'Forest', level: 1 },
        { scene: 'HeroSelectScene', text: 'Castle', level: 2 },
        { scene: 'HeroSelectScene', text: 'Dungeon', level: 3 },
        { scene: 'HeroSelectScene', text: 'Boss Level', level: 4 },
    ];
  }

  create():void {
    super.create();
  }

  setupMenuEvents(menuItem:MenuType):void {
    super.setupMenuEvents(menuItem);

    const { textGameObject } = menuItem;

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

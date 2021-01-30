import NavigationScene from './NavigationScene';

import { SceneConfig, MenuType } from '../interfaces/interfaces';
import * as lang from '../../../assets/lang/lang.json';
import { chooseLang } from '../utils/functions';

class LevelsScene extends NavigationScene {
  menu: MenuType[];
  levels: number;
  constructor(config: SceneConfig) {
    super(config, 'LevelsScene', true);

    const enOrRu = chooseLang(lang);

    this.menu = [
        { scene: 'HeroSelectScene', text: `${enOrRu.Levels.first}`, level: 1 },
        { scene: 'HeroSelectScene', text: `${enOrRu.Levels.second}`, level: 2 },
        { scene: 'HeroSelectScene', text: `${enOrRu.Levels.third}`, level: 3 },
        { scene: 'HeroSelectScene', text: `${enOrRu.Levels.fourth}`, level: 4 },
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

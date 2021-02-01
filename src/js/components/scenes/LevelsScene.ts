import NavigationScene from './NavigationScene';

import { SceneConfig, MenuType } from '../interfaces/interfaces';
import { getCurrentLanguageDictionary } from '../utils/functions';

import {
  FOREST_LEVEL,
  CASTLE_LEVEL,
  DUNGEON_LEVEL,
  BOSS_LEVEL
  } from './consts';

class LevelsScene extends NavigationScene {
  menu: MenuType[];
  levels: number;
  constructor(config: SceneConfig) {
    super(config, 'LevelsScene', true);

    const dictionary = getCurrentLanguageDictionary();

    this.menu = [
        { scene: 'HeroSelectScene', text: `${dictionary.Levels.first}`, level: FOREST_LEVEL },
        { scene: 'HeroSelectScene', text: `${dictionary.Levels.second}`, level: CASTLE_LEVEL },
        { scene: 'HeroSelectScene', text: `${dictionary.Levels.third}`, level: DUNGEON_LEVEL },
        { scene: 'HeroSelectScene', text: `${dictionary.Levels.fourth}`, level: BOSS_LEVEL },
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

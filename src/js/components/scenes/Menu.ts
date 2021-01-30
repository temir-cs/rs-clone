import NavigationScene from './NavigationScene';

import { SceneConfig, MenuType } from '../interfaces/interfaces';
import * as lang from '../../../assets/lang/lang.json';
import { chooseLang } from '../utils/functions';

class MenuScene extends NavigationScene {
  menu: MenuType[];
  constructor(config: SceneConfig, sceneName = 'MenuScene') {
    super(config, sceneName);

    const enOrRu = chooseLang(lang);

    this.menu = [
      { scene: 'HeroSelectScene', text: `${enOrRu.Menu.playBtn}` },
      { scene: 'LevelsScene', text: `${enOrRu.Menu.levelsBtn}` },
      { scene: 'HighscoreScene', text: `${enOrRu.Menu.highscoreBtn}` },
      { scene: 'SettingsScene', text: `${enOrRu.Menu.settingBtn}` }
    ];
  }

  create():void {
    super.create();
    this.createMenu(this.menu, (menuItem: MenuType) => this.setupMenuEvents(menuItem));
  }

  setupMenuEvents(menuItem: MenuType):void {
    super.setupMenuEvents(menuItem);

    const { textGameObject } = menuItem;

    textGameObject.on('pointerup', () => {
      if (menuItem.scene) {
        this.scene.start(menuItem.scene);
      }
    });
  }
}

export default MenuScene;

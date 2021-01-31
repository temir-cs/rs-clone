import NavigationScene from './NavigationScene';

import { SceneConfig, MenuType } from '../interfaces/interfaces';
import { getCurrentLanguageDictionary } from '../utils/functions';

class MenuScene extends NavigationScene {
  menu: MenuType[];
  constructor(config: SceneConfig, sceneName = 'MenuScene') {
    super(config, sceneName);

    const dictionary = getCurrentLanguageDictionary();

    this.menu = [
      { scene: 'HeroSelectScene', text: `${dictionary.Menu.playBtn}` },
      { scene: 'LevelsScene', text: `${dictionary.Menu.levelsBtn}` },
      { scene: 'HighscoreScene', text: `${dictionary.Menu.highscoreBtn}` },
      { scene: 'SettingsScene', text: `${dictionary.Menu.settingBtn}` }
    ];
  }

  create():void {
    super.create();
    this.createMenu(this.menu, (menuItem: MenuType) => this.setupMenuEvents(menuItem));
    this.add.image(290, 120, 'game-name')
      .setScale(0.6)
      .setOrigin(0, 0.5);
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

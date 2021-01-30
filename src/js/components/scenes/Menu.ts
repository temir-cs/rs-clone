import NavigationScene from './NavigationScene';

import { SceneConfig, MenuType } from '../interfaces/interfaces';

class MenuScene extends NavigationScene {
  menu: MenuType[];
  constructor(config: SceneConfig, sceneName = 'MenuScene') {
    super(config, sceneName, true);

    this.menu = [
      { scene: 'HeroSelectScene', text: 'Play' },
      { scene: 'LevelsScene', text: 'Levels' },
      { scene: 'HighscoreScene', text: 'Highscores' },
      { scene: 'SettingsScene', text: 'Settings' }
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

import BaseScene from './BaseScene';
import { SceneConfig, MenuType } from '../interfaces/interfaces';

class MenuScene extends BaseScene {
  menu: MenuType[];
  constructor(config: SceneConfig, sceneName = 'MenuScene') {
    super(sceneName, config);

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
        this.scene.start(menuItem.scene);
      }
    });
  }
}

export default MenuScene;

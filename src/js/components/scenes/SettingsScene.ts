import NavigationScene from './NavigationScene';

import { SceneConfig, MenuType } from '../interfaces/interfaces';
import { getCurrentLanguageDictionary } from '../utils/functions';

// import PlayScene from './Play';
// import PreloadScene from './Preload';
// import MenuScene from './Menu';
// import HeroSelectScene from './HeroSelectScene';
// import LevelsScene from './LevelsScene';
// import StartGame from '../../game';

// Scene
// import { Scenes } from '../../game';

class SettingsScene extends NavigationScene {
  menu: MenuType[];
  levels: number;
  constructor(config: SceneConfig) {
    super(config, 'SettingsScene', true);

    const dictionary = getCurrentLanguageDictionary();

    this.menu = [
      { text: `${dictionary.SettingsScene.fullScreen}` },
      { text: `${dictionary.SettingsScene.lang}` }
    ];
  }

  create():void {
    super.create();
  }

  setupMenuEvents(menuItem:MenuType): void {
    super.setupMenuEvents(menuItem);

    const { textGameObject } = menuItem;
    textGameObject.on('pointerup', () => {
      if (menuItem.text === 'Fullscreen (on / off)' || menuItem.text === 'Полный экран (вкл / выкл)') {
        if (!this.scale.isFullscreen) {
          this.scale.startFullscreen();
        } else {
          this.scale.stopFullscreen();
        }
      }

      if (menuItem.text === 'На РУС' || menuItem.text === 'To Eng') {
        if (localStorage.getItem('lang') !== null) {
          localStorage.removeItem('lang');
        } else {
          localStorage.setItem('lang', 'RU');
        }
        // Scenes.map((scene) => {
        //   scene.restart();
        // });
        // this.scene.start('SettingsScene');
        // this.scene.restart();
        window.location.reload();
      }
    });
  }
}

export default SettingsScene;

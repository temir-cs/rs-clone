import NavigationScene from './NavigationScene';

import { SceneConfig, MenuType } from '../interfaces/interfaces';
import { getCurrentLanguageDictionary } from '../utils/functions';

class SettingsScene extends NavigationScene {
  menu: MenuType[];
  levels: number;
  constructor(config: SceneConfig) {
    super(config, 'SettingsScene', true);

    const dictionary = getCurrentLanguageDictionary();

    this.menu = [
      { text: `${dictionary.SettingsScene.fullScreen}` }
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
    });
  }
}

export default SettingsScene;

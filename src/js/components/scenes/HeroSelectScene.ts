import BaseScene from './BaseScene';
import { SceneConfig, FontConfig } from '../interfaces/interfaces';
import { getCurrentLanguageDictionary } from '../utils/functions';

import {
  KNIGHT_HEALTH,
  KNIGHT_SPEED,
  KNIGHT_BOUNCE_VELOCITY,
  MAGE_HEALTH,
  MAGE_SPEED,
  MAGE_BOUNCE_VELOCITY,
  KNIGHT_IMAGE_X_SHIFT,
  MAGE_IMAGE_X_SHIFT,
  HERO_IMAGE_Y_SHIFT,
  KNIGHT_DESC_X_OFFSET,
  MAGE_DESC_X_OFFSET,
  HERO_DESC_Y_OFFSET,
  HERO_DESC_LINE_HEIGHT,
  ELEMENT_HOVER_COLOR,
  HERO_IMAGE_SCALE
} from './consts';

const dictionary = getCurrentLanguageDictionary();

const KNIGHT_DESC = [
  `${dictionary.HeroSelectScene.knightName}`,
  `${dictionary.HeroSelectScene.knightClass}`,
  `${dictionary.HeroSelectScene.knightCombat}`,
  `${dictionary.HeroSelectScene.knightHealth}`,
  `${dictionary.HeroSelectScene.knightSpeed}`,
];

const MAGE_DESC = [
  `${dictionary.HeroSelectScene.mageName}`,
  `${dictionary.HeroSelectScene.mageClass}`,
  `${dictionary.HeroSelectScene.mageCombat}`,
  `${dictionary.HeroSelectScene.mageHealth}`,
  `${dictionary.HeroSelectScene.mageSpeed}`
];

const HERO_STATS = {
  knight: {
    hero: 'knight',
    health: KNIGHT_HEALTH,
    speed: KNIGHT_SPEED,
    bounceVelocity: KNIGHT_BOUNCE_VELOCITY,
  },
  mage: {
    hero: 'mage',
    health: MAGE_HEALTH,
    speed: MAGE_SPEED,
    bounceVelocity: MAGE_BOUNCE_VELOCITY,
  }
};

class HeroSelectScene extends BaseScene {
  fontOptions: FontConfig;

  constructor(config:SceneConfig) {
    super('HeroSelectScene', { ...config, canGoBack: true });
  }

  create():void {
    super.create();

    this.fontOptions = {
      fontSize: '18px',
      fontStyle: 'normal',
      fontFamily: '"Press Start 2P"',
      fill: '#fff',
    };

    const knightImage = this.add.image(this.screenCenter[0] + KNIGHT_IMAGE_X_SHIFT, this.screenCenter[1] - HERO_IMAGE_Y_SHIFT, 'knight-image')
      .setScale(HERO_IMAGE_SCALE);
    const mageImage = this.add.image(this.screenCenter[0] + MAGE_IMAGE_X_SHIFT, this.screenCenter[1] - HERO_IMAGE_Y_SHIFT, 'mage-image')
      .setScale(HERO_IMAGE_SCALE);

    this.setupMenuEvents(knightImage, 'knight');
    this.setupMenuEvents(mageImage, 'mage');

    this.addText(KNIGHT_DESC, KNIGHT_DESC_X_OFFSET, HERO_DESC_Y_OFFSET, HERO_DESC_LINE_HEIGHT);
    this.addText(MAGE_DESC, MAGE_DESC_X_OFFSET, HERO_DESC_Y_OFFSET, HERO_DESC_LINE_HEIGHT);
  }

  addText(textArr: Array<string>, xOffset:number, yOffset:number, lineHeight:number):void {
    for (let i = 0; i < textArr.length; i += 1) {
      const step = i * lineHeight;
      this.add.text(this.screenCenter[0] + xOffset, this.screenCenter[1] + yOffset + step, textArr[i], this.fontOptions);
    }
  }

  setupMenuEvents(item:Phaser.GameObjects.Image, hero:string):void {
    item.setInteractive();

    item.on('pointerup', () => {
      this.registry.set('currentHeroStats', HERO_STATS[hero]);
      this.scene.start('PlayScene', { gameStatus: 'NEW_GAME' });
    });

    item.on('pointerover', () => {
      item.setTint(ELEMENT_HOVER_COLOR);
    });

    item.on('pointerout', () => {
      item.clearTint();
    });
  }
}

export default HeroSelectScene;

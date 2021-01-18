import * as Phaser from 'phaser';
import WebFontFile from '../loaders/WebFontLoader';

class Preload extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', '../../../assets/json/01_forest_map.json');
    this.load.image('tiles-1', '../../../assets/img/01_forest_platforms.png');
    this.load.image('tiles-2', '../../../assets/img/01_forest_env.png');

    // Forest Level Background
    this.load.image('bg-forest-sky', '../../../assets/img/levels/forest/sky.png');
    this.load.image('bg-forest-trees', '../../../assets/img/levels/forest/trees.png');
    this.load.image('bg-forest-mountains', '../../../assets/img/levels/forest/mountains.png');
    this.load.image('bg-forest-clouds-1', '../../../assets/img/levels/forest/clouds_back_layer1.png');
    this.load.image('bg-forest-clouds-2', '../../../assets/img/levels/forest/clouds_back_layer2.png');
    this.load.image('bg-forest-clouds-small', '../../../assets/img/levels/forest/coluds_small.png');
    this.load.image('bg-forest-tileset', '../../../assets/img/levels/forest/green-tile.png');
    this.load.image('coin-static', '../../../assets/img/collectables/coin.png');
    this.load.image('key-static', '../../../assets/img/collectables/key3.png');
    // this.load.image('door-static', '../../../assets/img/levels/forest/door1.png');

    // Menu items
    this.load.image('menu-bg', '../../../assets/img/menu/menu-bg.png');
    this.load.image('game-over', '../../../assets/img/menu/gameover.jpg');
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
    this.load.image('back', '../../../assets/img/menu/backward_button.png');
    this.load.image('home', '../../../assets/img/menu/home_button.png');

    // Sprites
    this.load.multiatlas('knight', '../../../assets/json/heroes/knightSprite.json', '../../../assets/img/heroes');
    this.load.multiatlas('troll', '../../../assets/json/enemies/enemyGoblinSprite.json', '../../../assets/img/enemies');
    this.load.multiatlas('imp', '../../../assets/json/enemies/enemyImpSprite.json', '../../../assets/img/enemies');
    this.load.multiatlas('weapon-effects', '../../../assets/json/weapons/weaponEffects.json', '../../../assets/img/weapons');
    this.load.multiatlas('collectables', '../../../assets/json/collectables/collectablesSprite.json', '../../../assets/img/collectables');
    this.load.multiatlas('doors', '../../../assets/json/doors/doorsSprite.json', '../../../assets/img/doors/');

    // Audio
    this.load.audio('forest-theme', '../../../assets/sounds/forest-theme.mp3');
    this.load.audio('zap', '../../../assets/sounds/zap.wav');
    this.load.audio('sword-swing', '../../../assets/sounds/sword-swing.wav');
    this.load.audio('step', '../../../assets/sounds/step.wav');
    this.load.audio('jump', '../../../assets/sounds/jump-2.wav');
    this.load.audio('coin-pickup', '../../../assets/sounds/coin.wav');
    this.load.audio('damage', '../../../assets/sounds/damage.wav');
    this.load.audio('key-pickup', '../../../assets/sounds/key.wav');
    this.load.audio('door-opening', '../../../assets/sounds/door-opening.wav');
    this.load.audio('troll-hit', '../../../assets/sounds/troll-hit.wav');
    this.load.audio('troll-dead', '../../../assets/sounds/troll-dead.wav');
    this.load.audio('imp-hit', '../../../assets/sounds/imp-hit.wav');
    this.load.audio('imp-dead', '../../../assets/sounds/imp-dead.wav');
  }

  create() {
    this.scene.start('MenuScene');
  }
}

export default Preload;

import * as Phaser from 'phaser';
import WebFontFile from '../loaders/WebFontLoader';

class Preload extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', '../../../assets/json/01_forest_map.json');
    this.load.image('tiles-1', '../../../assets/img/levels/forest/01_forest_platforms.png');
    this.load.image('tiles-2', '../../../assets/img/levels/forest/01_forest_env.png');
    this.load.image('tiles-3', '../../../assets/img/levels/forest/castle_tiles.png');

    this.load.tilemapTiledJSON('map-lvl2', '../../../assets/json/02_castle_map.json');
    this.load.image('tiles-1-lvl2', '../../../assets/img/levels/castle/castle_platforms.png');

    // Forest Level Background
    this.load.image('bg-forest-sky', '../../../assets/img/levels/forest/sky.png');
    this.load.image('bg-forest-trees', '../../../assets/img/levels/forest/trees.png');
    this.load.image('bg-forest-mountains', '../../../assets/img/levels/forest/mountains.png');
    this.load.image('bg-forest-clouds-1', '../../../assets/img/levels/forest/clouds_back_layer1.png');
    this.load.image('bg-forest-clouds-2', '../../../assets/img/levels/forest/clouds_back_layer2.png');
    this.load.image('bg-forest-clouds-small', '../../../assets/img/levels/forest/coluds_small.png');
    this.load.image('bg-forest-tileset', '../../../assets/img/levels/forest/green-tile.png');

    // Castle Level Background
    this.load.image('bg-castle-sky', '../../../assets/img/levels/castle/sky.png');
    this.load.image('bg-castle-trees', '../../../assets/img/levels/castle/trees.png');
    this.load.image('bg-castle-wall', '../../../assets/img/levels/castle/wall.png');
    this.load.image('bg-castle-top', '../../../assets/img/levels/castle/top.png');
    this.load.image('bg-castle-down', '../../../assets/img/levels/castle/down.png');
    this.load.image('bg-castle-tileset', '../../../assets/img/levels/castle/castle_bg_tiles.png');

    // Static pictures
    this.load.image('coin-static', '../../../assets/img/collectables/coin.png');
    this.load.image('key-static', '../../../assets/img/collectables/key3.png');

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
    this.load.audio('key-pickup', '../../../assets/sounds/key.wav');
    this.load.audio('door-opening', '../../../assets/sounds/door-opening.wav');
    this.load.audio('player-hit', '../../../assets/sounds/damage.wav');
    this.load.audio('player-dead', '../../../assets/sounds/player-dead.wav');
    this.load.audio('troll-hit', '../../../assets/sounds/troll-hit.wav');
    this.load.audio('troll-dead', '../../../assets/sounds/troll-dead.wav');
    this.load.audio('imp-hit', '../../../assets/sounds/imp-hit.wav');
    this.load.audio('imp-dead', '../../../assets/sounds/imp-dead.wav');

    this.load.bitmapFont('arcade', '../../../assets/font/highscore/arcade.png', '../../../assets/font/highscore/arcade.xml');

    this.load.once('complete', () => {
      this.startGame();
    });
  }

  startGame() {
    this.registry.set('level', 1);
    this.registry.set('unlocked-levels', 2);
    this.scene.start('MenuScene');
  }

  // create() {
  //   this.registry.set('level', 1);
  //   this.scene.start('MenuScene');
  // }
}

export default Preload;

import * as Phaser from 'phaser';
import WebFontFile from '../loaders/WebFontLoader';

class Preload extends Phaser.Scene {
  text: Phaser.GameObjects.Text;
  constructor() {
    super('PreloadScene');
  }

  preload():void {
    this.load.tilemapTiledJSON('map', '../../../assets/json/01_forest_map.json');
    this.load.image('tiles-1', '../../../assets/img/levels/forest/01_forest_platforms.png');
    this.load.image('tiles-2', '../../../assets/img/levels/forest/01_forest_env.png');
    this.load.image('tiles-3', '../../../assets/img/levels/forest/castle_tiles.png');

    this.load.tilemapTiledJSON('map-lvl2', '../../../assets/json/02_castle_map.json');
    this.load.image('tiles-1-lvl2', '../../../assets/img/levels/castle/castle_platforms.png');

    this.load.tilemapTiledJSON('map-lvl3', '../../../assets/json/03_dungeon_map.json');
    this.load.image('tiles-1-lvl3', '../../../assets/img/levels/dungeon/dungeon_platforms.png');
    this.load.image('bg-dungeon-tileset', '../../../assets/img/levels/dungeon/dungeon_bg_tiles.png');

    this.load.tilemapTiledJSON('map-lvl4', '../../../assets/json/04_final_map.json');

    // Hero select images
    this.load.image('knight-image', '../../../assets/img/heroes/knight-image.png');
    this.load.image('mage-image', '../../../assets/img/heroes/mage-image.png');

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

    // dungeon Level Background
    this.load.image('bg-dungeon-back', '../../../assets/img/levels/dungeon/back_ruin_spots.png');
    this.load.image('bg-dungeon-middle', '../../../assets/img/levels/dungeon/ruins_closer.png');
    this.load.image('bg-dungeon-main', '../../../assets/img/levels/dungeon/ruins_main.png');
    this.load.image('bg-dungeon-bottom', '../../../assets/img/levels/dungeon/ruins_low1.png');
    this.load.image('bg-dungeon-top', '../../../assets/img/levels/dungeon/ruins_top.png');

    // final Level Background
    this.load.image('bg-final-back', '../../../assets/img/levels/final/bg.png');
    this.load.image('bg-final-mist', '../../../assets/img/levels/final/myst.png');
    this.load.image('bg-final-top', '../../../assets/img/levels/final/rock2.png');
    this.load.image('bg-final-bottom', '../../../assets/img/levels/final/rock1.png');
    // this.load.image('bg-final-middle', '../../../assets/img/levels/final/rock3.png');
    // this.load.image('bg-final-middle2', '../../../assets/img/levels/final/rock5.png');

    // Final level screen
    this.load.image('finish-game', '../../../assets/img/menu/endOfChapter.png');
    this.load.image('win-bg', '../../../assets/img/menu/win-bkg.png');

    // HUD elements
    this.load.image('coin-static', '../../../assets/img/hud/coin.png');
    this.load.image('heart-static', '../../../assets/img/hud/heart.png');
    this.load.image('key-static', '../../../assets/img/hud/key.png');
    this.load.image('knight-avatar', '../../../assets/img/hud/knight-avatar.png');
    this.load.image('mage-avatar', '../../../assets/img/hud/mage-avatar.png');

    // Menu items
    this.load.image('menu-bg', '../../../assets/img/menu/menu-bg.png');
    this.load.image('game-over', '../../../assets/img/menu/gameover.jpg');
    this.load.image('landscapeMode', '../../../assets/img/menu/landscapeMode.png');
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
    this.load.image('back', '../../../assets/img/menu/backward_button.png');
    this.load.image('home', '../../../assets/img/menu/home_button.png');
    this.load.image('mute', '../../../assets/img/menu/mute-music.png');

    // Sprites
    this.load.multiatlas('knight', '../../../assets/json/heroes/knightSprite.json', '../../../assets/img/heroes');
    this.load.multiatlas('mage', '../../../assets/json/heroes/mageSprite.json', '../../../assets/img/heroes');
    this.load.multiatlas('troll', '../../../assets/json/enemies/enemyGoblinSprite.json', '../../../assets/img/enemies');
    this.load.multiatlas('skeleton', '../../../assets/json/enemies/enemySkeleton.json', '../../../assets/img/enemies');
    this.load.multiatlas('vampire', '../../../assets/json/enemies/enemyVampire.json', '../../../assets/img/enemies');
    this.load.multiatlas('imp', '../../../assets/json/enemies/enemyImpSprite.json', '../../../assets/img/enemies');
    this.load.multiatlas('boss', '../../../assets/json/enemies/bossSprite.json', '../../../assets/img/enemies');
    this.load.multiatlas('weapon-effects', '../../../assets/json/weapons/weaponEffects.json', '../../../assets/img/weapons');
    this.load.multiatlas('tesla-ball', '../../../assets/json/weapons/teslaBall.json', '../../../assets/img/weapons');
    this.load.multiatlas('collectables', '../../../assets/json/collectables/collectablesSprite.json', '../../../assets/img/collectables');
    this.load.multiatlas('doors', '../../../assets/json/doors/doorsSprite.json', '../../../assets/img/doors/');
    this.load.multiatlas('traps', '../../../assets/json/enemies/trapsSprite.json', '../../../assets/img/enemies/');

    // Audio
    this.load.audio('forest-theme', '../../../assets/sounds/forest-theme.mp3');
    this.load.audio('forest-lvl-theme', '../../../assets/sounds/forest-lvl-theme.mp3');
    this.load.audio('castle-theme', '../../../assets/sounds/09-BLOODYTEARS.mp3');
    this.load.audio('boss-theme', '../../../assets/sounds/boss-music.mp3');
    this.load.audio('zap', '../../../assets/sounds/zap.wav');
    this.load.audio('sword-swing', '../../../assets/sounds/sword-swing.wav');
    this.load.audio('step', '../../../assets/sounds/step.wav');
    this.load.audio('jump', '../../../assets/sounds/jump-2.wav');
    this.load.audio('coin-pickup', '../../../assets/sounds/coin.wav');
    this.load.audio('key-pickup', '../../../assets/sounds/key.wav');
    this.load.audio('hit-point-pickup', '../../../assets/sounds/health-pickup.mp3');
    this.load.audio('door-opening', '../../../assets/sounds/door-opening.wav');
    this.load.audio('player-hit', '../../../assets/sounds/damage.wav');
    this.load.audio('player-dead', '../../../assets/sounds/player-dead.wav');
    this.load.audio('troll-hit', '../../../assets/sounds/troll-hit.wav');
    this.load.audio('troll-dead', '../../../assets/sounds/troll-dead.wav');
    this.load.audio('imp-hit', '../../../assets/sounds/imp-hit.wav');
    this.load.audio('imp-dead', '../../../assets/sounds/imp-dead.wav');
    this.load.audio('boss-hit', '../../../assets/sounds/boss-hit.wav');
    this.load.audio('boss-death', '../../../assets/sounds/boss-death.wav');
    this.load.audio('fire-trap', '../../../assets/sounds/flamestrike.mp3');
    this.load.audio('spikes-trap', '../../../assets/sounds/spikes-trap.mp3');
    this.load.audio('game-over', '../../../assets/sounds/game-over.mp3');
    this.load.audio('game-win', '../../../assets/sounds/game-win.mp3');

    this.load.bitmapFont('arcade', '../../../assets/font/highscore/arcade.png', '../../../assets/font/highscore/arcade.xml');

    this.load.once('complete', () => {
      this.startGame();
    });
  }

  startGame():void {
    this.registry.set('level', 1);
    this.registry.set('unlocked-levels', 4);
    this.scene.start('MenuScene');
  }
  // create() {
  //   this.registry.set('level', 1);
  //   this.scene.start('MenuScene');
  // }
}

export default Preload;

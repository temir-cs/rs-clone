import Play from '../Play';
import {
  FINAL_CASTLE_WALL_DEPTH,
  FINAL_WALLS_DEPTH,
  FINAL_WALLS_SCALE,
  FINAL_MIST_DEPTH,
  FINAL_MIST_SCALE,
  FINAL_TOP_DEPTH,
  FINAL_TOP_SCALE,
  FINAL_BOTTOM_DEPTH,
  FINAL_BOTTOM_SCALE,
  FINAL_MIST_PARALLAX,
  FINAL_WALLS_PARALLAX,
} from '../consts';

const createMapFinal = (context:Play):void => {
  context.map = context.make.tilemap({ key: 'map-lvl4' });
  context.map.addTilesetImage('dungeon_platforms', 'tiles-1-lvl3');
  // context.map.addTilesetImage('final_bg_tiles', 'bg-final-tileset');
};

const createLayersFinal = (context:Play):void => {
  const tileset1 = context.map.getTileset('dungeon_platforms');
  // const tilesetBg = context.map.getTileset('final_bg_tiles');

  // context.map.createLayer('distance', tilesetBg);

  context.layers.castleWall = context.map.createLayer('castle_wall', tileset1).setDepth(FINAL_CASTLE_WALL_DEPTH);
  context.layers.platformColliders = context.map.createLayer('platform_colliders', tileset1);
  context.layers.platformColliders.setCollisionByProperty({ collides: true });
  context.layers.platformColliders.setAlpha(0);
  context.layers.enemiesPlatformColliders = context.map.createLayer('enemies_colliders', tileset1);
  context.layers.enemiesPlatformColliders.setCollisionByProperty({ collides: true });
  context.layers.enemiesPlatformColliders.setAlpha(0);
  context.layers.environmentBottom = context.map.createLayer('environment_bottom', tileset1);
  context.layers.platforms = context.map.createLayer('platforms', tileset1);
  context.layers.environmentTop = context.map.createLayer('environment_top', tileset1);
  context.layers.playerZones = context.map.getObjectLayer('player_zones');
  context.layers.collectables = context.map.getObjectLayer('collectables');
  context.layers.collectableKey = context.map.getObjectLayer('collectableKey');
  context.layers.enemySpawns = context.map.getObjectLayer('enemy_spawns');
  context.layers.trapsSpawns = context.map.getObjectLayer('traps');
  context.layers.potions = context.map.getObjectLayer('potions') || null;
 };

const createBgFinal = (context:Play):void => {
  const bgObject = context.map.getObjectLayer('distance_bg').objects[0];

  context.wallsImg = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-final-back')
    .setOrigin(0, 1)
    .setDepth(FINAL_WALLS_DEPTH)
    .setScale(FINAL_WALLS_SCALE)
    .setScrollFactor(0, 1);

  context.mistImg = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-final-mist')
    .setOrigin(0, 1)
    .setDepth(FINAL_MIST_DEPTH)
    .setScale(FINAL_MIST_SCALE)
    .setScrollFactor(0, 1);

  context.add.tileSprite(bgObject.x, 0, context.config.width, bgObject.height, 'bg-final-top')
    .setOrigin(0, 0)
    .setDepth(FINAL_TOP_DEPTH)
    .setScale(FINAL_TOP_SCALE)
    .setScrollFactor(0, 1);

  context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-final-bottom')
    .setOrigin(0, 1)
    .setDepth(FINAL_BOTTOM_DEPTH)
    .setScale(FINAL_BOTTOM_SCALE)
    .setScrollFactor(0, 1);
};

const bgParallaxFinal = (context:Play):void => {
  context.mistImg.tilePositionX = context.cameras.main.scrollX * FINAL_MIST_PARALLAX;
  context.wallsImg.tilePositionX = context.cameras.main.scrollX * FINAL_WALLS_PARALLAX;
  context.wallsImg.tilePositionY = context.cameras.main.scrollY * FINAL_WALLS_PARALLAX;
};

 export { createMapFinal,
          createLayersFinal,
          createBgFinal,
          bgParallaxFinal };

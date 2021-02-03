import Play from '../Play';
import {
  CASTLE_CASTLE_WALL_DEPTH,
  CASTLE_DOWN_DEPTH,
  CASTLE_DOWN_SCALE,
  CASTLE_WALLS_DEPTH,
  CASTLE_WALLS_SCALE,
  CASTLE_TREES_DEPTH,
  CASTLE_TREES_SCALE,
  CASTLE_SKY_DEPTH,
  CASTLE_SKY_SCALE,
  CASTLE_TREES_PARALLAX,
  CASTLE_WALLS_PARALLAX,
  FOREST_CASTLE_WALL_DEPTH,
} from '../consts';

const createMapCastle = (context:Play):void => {
  context.map = context.make.tilemap({ key: 'map-lvl2' });
  context.map.addTilesetImage('castle_platforms', 'tiles-1-lvl2');
  context.map.addTilesetImage('castle_bg_tiles', 'bg-castle-tileset');
};

const createLayersCastle = (context:Play):void => {
  const tileset1 = context.map.getTileset('castle_platforms');
  const tilesetBg = context.map.getTileset('castle_bg_tiles');

  context.map.createLayer('distance', tilesetBg).setDepth(FOREST_CASTLE_WALL_DEPTH);

  context.layers.castleWall = context.map.createLayer('castle_wall', tileset1).setDepth(CASTLE_CASTLE_WALL_DEPTH);
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

const createBgCastle = (context:Play):void => {
  const bgObject = context.map.getObjectLayer('distance_bg').objects[0];

  context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-castle-down')
    .setOrigin(0, 1)
    .setDepth(CASTLE_DOWN_DEPTH)
    .setScale(CASTLE_DOWN_SCALE)
    .setScrollFactor(0, 1);

  context.wallsImg = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-castle-wall')
    .setOrigin(0, 1)
    .setDepth(CASTLE_WALLS_DEPTH)
    .setScale(CASTLE_WALLS_SCALE)
    .setScrollFactor(0, 1);

  context.treesImg = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-castle-trees')
    .setOrigin(0, 1)
    .setDepth(CASTLE_TREES_DEPTH)
    .setScale(CASTLE_TREES_SCALE)
    .setScrollFactor(0, 1);

  context.add.tileSprite(0, 0, context.config.width, bgObject.height, 'bg-castle-sky')
    .setOrigin(0, 0)
    .setDepth(CASTLE_SKY_DEPTH)
    .setScale(CASTLE_SKY_SCALE)
    .setScrollFactor(0, 1);
};

const bgParallaxCastle = (context:Play):void => {
  context.treesImg.tilePositionX = context.cameras.main.scrollX * CASTLE_TREES_PARALLAX;
  context.wallsImg.tilePositionX = context.cameras.main.scrollX * CASTLE_WALLS_PARALLAX;
  context.wallsImg.tilePositionY = context.cameras.main.scrollY * CASTLE_WALLS_PARALLAX;
};

 export { createMapCastle,
          createLayersCastle,
          createBgCastle,
          bgParallaxCastle };

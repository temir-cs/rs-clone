import Play from '../Play';
import {
  FOREST_CASTLE_WALL_DEPTH,
  FOREST_BKG_DEPTH,
  FOREST_BKG_SCALE,
  FOREST_MOUNTAINS_DEPTH,
  FOREST_MOUNTAINS_SCALE,
  FOREST_CLOUDS1_DEPTH,
  FOREST_CLOUDS1_SCALE,
  FOREST_CLOUDS2_DEPTH,
  FOREST_CLOUDS2_SCALE,
  FOREST_CLOUDSSM_DEPTH,
  FOREST_CLOUDSSM_SCALE,
  FOREST_SKY_DEPTH,
  FOREST_SKY_SCALE,
  FOREST_BKG_PARALLAX,
  FOREST_MOUNTAINS_PARALLAX,
  FOREST_CLOUDSSM_PARALLAX,
  } from '../consts';

const createMapForest = (context:Play):void => {
  context.map = context.make.tilemap({ key: 'map' });
  context.map.addTilesetImage('01_forest_platforms', 'tiles-1');
  context.map.addTilesetImage('01_forest_env', 'tiles-2');
  context.map.addTilesetImage('green-tile', 'bg-forest-tileset');
  context.map.addTilesetImage('castle_tiles', 'tiles-3');
};

const createLayersForest = (context:Play):void => {
    const tileset1 = context.map.getTileset('01_forest_platforms');
    const tileset2 = context.map.getTileset('01_forest_env');
    const tilesetBg = context.map.getTileset('green-tile');
    const tileset3 = context.map.getTileset('castle_tiles');

    context.map.createLayer('distance', tilesetBg);

    context.layers.castleWall = context.map.createLayer('castle_wall', tileset3).setDepth(FOREST_CASTLE_WALL_DEPTH);
    context.layers.platformColliders = context.map.createLayer('platform_colliders', tileset1);
    context.layers.platformColliders.setCollisionByProperty({ collides: true });
    context.layers.platformColliders.setAlpha(0);
    context.layers.enemiesPlatformColliders = context.map.createLayer('enemies_colliders', tileset1);
    context.layers.enemiesPlatformColliders.setCollisionByProperty({ collides: true });
    context.layers.enemiesPlatformColliders.setAlpha(0);
    context.layers.environmentBottom = context.map.createLayer('environment_bottom', tileset2);
    context.layers.platforms = context.map.createLayer('platforms', tileset1);
    context.layers.environmentTop = context.map.createLayer('environment_top', tileset2);
    context.layers.playerZones = context.map.getObjectLayer('player_zones');
    context.layers.enemySpawns = context.map.getObjectLayer('enemy_spawns');
    context.layers.collectables = context.map.getObjectLayer('collectables');
    context.layers.collectableKey = context.map.getObjectLayer('collectableKey');
    context.layers.trapsSpawns = context.map.getObjectLayer('traps');
    context.layers.potions = context.map.getObjectLayer('potions') || null;
  };

const createBgForest = (context:Play):void => {
    const bgObject = context.map.getObjectLayer('distance_bg').objects[0];
    context.bkgForest = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-forest-trees')
      .setOrigin(0, 1)
      .setDepth(FOREST_BKG_DEPTH)
      .setScale(FOREST_BKG_SCALE)
      .setScrollFactor(0, 1);

    context.bkgMountains = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-forest-mountains')
      .setOrigin(0, 1)
      .setDepth(FOREST_MOUNTAINS_DEPTH)
      .setScale(FOREST_MOUNTAINS_SCALE)
      .setScrollFactor(0, 1);

    context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-forest-clouds-1')
      .setOrigin(0, 1)
      .setDepth(FOREST_CLOUDS1_DEPTH)
      .setScale(FOREST_CLOUDS1_SCALE)
      .setScrollFactor(0, 1);

    context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-forest-clouds-2')
      .setOrigin(0, 1)
      .setDepth(FOREST_CLOUDS2_DEPTH)
      .setScale(FOREST_CLOUDS2_SCALE)
      .setScrollFactor(0, 1);

    context.bkgClouds = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-forest-clouds-small')
      .setOrigin(0, 1)
      .setDepth(FOREST_CLOUDSSM_DEPTH)
      .setScale(FOREST_CLOUDSSM_SCALE)
      .setScrollFactor(0, 1);

    context.add.tileSprite(0, 0, context.config.width, bgObject.height, 'bg-forest-sky')
      .setOrigin(0, 0)
      .setDepth(FOREST_SKY_DEPTH)
      .setScale(FOREST_SKY_SCALE)
      .setScrollFactor(0, 1);
  };

const bgParallaxForest = (context:Play):void => {
  context.bkgForest.tilePositionX = context.cameras.main.scrollX * FOREST_BKG_PARALLAX;
  context.bkgMountains.tilePositionX = context.cameras.main.scrollX * FOREST_MOUNTAINS_PARALLAX;
  context.bkgClouds.tilePositionX = context.cameras.main.scrollX * FOREST_CLOUDSSM_PARALLAX;
};

 export { createMapForest,
          createLayersForest,
          createBgForest,
          bgParallaxForest };

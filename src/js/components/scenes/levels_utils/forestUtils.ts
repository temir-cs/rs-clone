import Play from '../Play';

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

    context.layers.castleWall = context.map.createLayer('castle_wall', tileset3).setDepth(-3);
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
  };

const createBgForest = (context:Play):void => {
    const bgObject = context.map.getObjectLayer('distance_bg').objects[0];
    context.bkgForest = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-forest-trees')
      .setOrigin(0, 1)
      .setDepth(-10)
      .setScale(1.5)
      .setScrollFactor(0, 1);

    context.bkgMountains = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-forest-mountains')
      .setOrigin(0, 1)
      .setDepth(-11)
      .setScale(1.5)
      .setScrollFactor(0, 1);

    context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-forest-clouds-1')
      .setOrigin(0, 1)
      .setDepth(-12)
      .setScale(1.5)
      .setScrollFactor(0, 1);

    context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-forest-clouds-2')
      .setOrigin(0, 1)
      .setDepth(-13)
      .setScale(1.5)
      .setScrollFactor(0, 1);

    context.bkgClouds = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-forest-clouds-small')
      .setOrigin(0, 1)
      .setDepth(-10)
      .setScale(1.5)
      .setScrollFactor(0, 1);

    context.add.tileSprite(0, 0, context.config.width, bgObject.height, 'bg-forest-sky')
      .setOrigin(0, 0)
      .setDepth(-14)
      .setScale(1.2)
      .setScrollFactor(0, 1);
  };

const bgParallaxForest = (context:Play):void => {
  context.bkgForest.tilePositionX = context.cameras.main.scrollX * 0.2;
  context.bkgMountains.tilePositionX = context.cameras.main.scrollX * 0.15;
  context.bkgClouds.tilePositionX = context.cameras.main.scrollX * 0.1;
};

 export { createMapForest,
          createLayersForest,
          createBgForest,
          bgParallaxForest };

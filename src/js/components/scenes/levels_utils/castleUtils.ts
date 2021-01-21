const createMapCastle = (context):void => {
  context.map = context.make.tilemap({ key: 'map-lvl2' });
  context.map.addTilesetImage('castle_platforms', 'tiles-1-lvl2');
  context.map.addTilesetImage('castle_bg_tiles', 'bg-castle-tileset');
};

const createLayersCastle = (context):void => {
  const tileset1 = context.map.getTileset('castle_platforms');
  const tilesetBg = context.map.getTileset('castle_bg_tiles');

  context.map.createLayer('distance', tilesetBg).setDepth(-3);

  context.layers.castleWall = context.map.createLayer('castle_wall', tileset1).setDepth(-2);
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
 };

const createBgCastle = (context) => {
  const bgObject = context.map.getObjectLayer('distance_bg').objects[0];

  context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-castle-down')
    .setOrigin(0, 1)
    .setDepth(-11)
    .setScale(1.2)
    .setScrollFactor(0, 1);

  context.wallsImg = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-castle-wall')
    .setOrigin(0, 1)
    .setDepth(-12)
    .setScale(1.2)
    .setScrollFactor(0, 1);

  context.treesImg = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-castle-trees')
    .setOrigin(0, 1)
    .setDepth(-13)
    .setScale(1.4)
    .setScrollFactor(0, 1);

  context.add.tileSprite(0, 0, context.config.width, bgObject.height, 'bg-castle-sky')
    .setOrigin(0, 0)
    .setDepth(-14)
    .setScale(1.5)
    .setScrollFactor(0, 1);
};

const bgParallaxCastle = (context) => {
  context.treesImg.tilePositionX = context.cameras.main.scrollX * 0.2;
  context.wallsImg.tilePositionX = context.cameras.main.scrollX * 0.15;
  context.wallsImg.tilePositionY = context.cameras.main.scrollY * 0.15;
};

 export { createMapCastle,
          createLayersCastle,
          createBgCastle,
          bgParallaxCastle };

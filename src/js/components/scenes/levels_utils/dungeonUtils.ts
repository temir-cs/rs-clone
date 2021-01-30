import Play from '../Play';

const createMapDungeon = (context:Play):void => {
  context.map = context.make.tilemap({ key: 'map-lvl3' });
  context.map.addTilesetImage('dungeon_platforms', 'tiles-1-lvl3');
  context.map.addTilesetImage('dungeon_bg_tiles', 'bg-dungeon-tileset');
};

const createLayersDungeon = (context:Play):void => {
  const tileset1 = context.map.getTileset('dungeon_platforms');
  const tilesetBg = context.map.getTileset('dungeon_bg_tiles');

  context.map.createLayer('distance', tilesetBg).setDepth(-20);

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
  context.layers.trapsSpawns = context.map.getObjectLayer('traps');
  context.layers.potions = context.map.getObjectLayer('potions') || null;
 };

const createBgDungeon = (context:Play):void => {
  const bgObject = context.map.getObjectLayer('distance_bg').objects[0];

  context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-dungeon-back')
    .setOrigin(0, 1)
    .setDepth(-13)
    .setScale(1.6)
    .setScrollFactor(0, 1);

  context.wallsImg = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-dungeon-middle')
    .setOrigin(0, 1)
    .setDepth(-12)
    .setScale(1.6)
    .setScrollFactor(0, 1);

  context.treesImg = context.add.tileSprite(bgObject.x, bgObject.y, context.config.width, bgObject.height, 'bg-dungeon-main')
    .setOrigin(0, 1)
    .setDepth(-11)
    .setScale(1.6)
    .setScrollFactor(0, 1);

  context.add.tileSprite(bgObject.x, 0, context.config.width, bgObject.height, 'bg-dungeon-top')
    .setOrigin(0, 0)
    .setDepth(-10)
    .setScale(1.1)
    .setScrollFactor(0, 1);

  context.add.tileSprite(0, 0, context.config.width, bgObject.height, 'bg-dungeon-bottom')
    .setOrigin(0, 0)
    .setDepth(-10)
    .setScale(2)
    .setScrollFactor(0, 1);
};

const bgParallaxDungeon = (context:Play):void => {
  context.treesImg.tilePositionX = context.cameras.main.scrollX * 0.2;
  context.wallsImg.tilePositionX = context.cameras.main.scrollX * 0.1;
};

 export { createMapDungeon,
          createLayersDungeon,
          createBgDungeon,
          bgParallaxDungeon };

export default (anims) => {
  anims.create({
    key: 'boss-idle',
    frames: anims.generateFrameNames('boss', {
      start: 1,
      end: 3,
      prefix: 'Idle',
      suffix: '.png'
    }),
    frameRate: 6,
    repeat: -1,
  });

  anims.create({
    key: 'boss-walk',
    frames: anims.generateFrameNames('boss', {
      start: 1,
      end: 6,
      prefix: 'Walk',
      suffix: '.png'
    }),
    frameRate: 6,
    repeat: -1,
  });

  anims.create({
    key: 'boss-attack',
    frames: anims.generateFrameNames('boss', {
      start: 1,
      end: 7,
      prefix: 'Attack',
      suffix: '.png'
    }),
    frameRate: 12,
    repeat: 0,
  });

  anims.create({
    key: 'boss-magic-attack',
    frames: anims.generateFrameNames('boss', {
      start: 1,
      end: 5,
      prefix: 'Magic_;lightning',
      suffix: '.png'
    }),
    frameRate: 12,
    repeat: 0,
  });

  anims.create({
    key: 'boss-hurt',
    frames: anims.generateFrameNames('boss', {
      start: 1,
      end: 2,
      prefix: 'Hurt',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: 0
  });

  anims.create({
    key: 'boss-death',
    frames: anims.generateFrameNames('boss', {
      start: 0,
      end: 5,
      prefix: 'Death',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: 0
  });

  anims.create({
    key: 'boss-dead',
    frames: anims.generateFrameNames('boss', {
      start: 5,
      end: 5,
      prefix: 'Fire_boss_death',
      suffix: '.png'
    }),
    frameRate: 1,
    repeat: -1
  });
};

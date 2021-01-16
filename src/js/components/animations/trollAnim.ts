export default (anims) => {
  anims.create({
    key: 'troll-idle',
    frames: anims.generateFrameNames('troll', {
      start: 1,
      end: 6,
      prefix: 'walk',
      suffix: '.png'
    }),
    frameRate: 6,
    repeat: -1,
  });

  anims.create({
    key: 'troll-hurt',
    frames: anims.generateFrameNames('troll', {
      start: 1,
      end: 3,
      prefix: 'hurt',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: 0
  });

  anims.create({
    key: 'troll-death',
    frames: anims.generateFrameNames('troll', {
      start: 1,
      end: 4,
      prefix: 'death',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: 0
  });

  anims.create({
    key: 'troll-dead',
    frames: anims.generateFrameNames('troll', {
      start: 4,
      end: 4,
      prefix: 'death',
      suffix: '.png'
    }),
    frameRate: 1,
    repeat: -1
  });
};

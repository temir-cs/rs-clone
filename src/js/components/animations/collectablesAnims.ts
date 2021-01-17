export default (anims) => {
  anims.create({
    key: 'coin',
    frames: anims.generateFrameNames('collectables', {
      start: 1,
      end: 10,
      prefix: 'coin',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'crystal',
    frames: anims.generateFrameNames('collectables', {
      start: 1,
      end: 10,
      prefix: 'crystal',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'heart',
    frames: anims.generateFrameNames('collectables', {
      start: 1,
      end: 10,
      prefix: 'heart',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'hit-point',
    frames: anims.generateFrameNames('collectables', {
      start: 1,
      end: 10,
      prefix: 'hit_point',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'star',
    frames: anims.generateFrameNames('collectables', {
      start: 1,
      end: 10,
      prefix: 'star',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'key',
    frames: anims.generateFrameNames('collectables', {
      start: 1,
      end: 8,
      prefix: 'key',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });
};

export default (anims) => {
  anims.create({
    key: 'coin',
    frames: anims.generateFrameNames('collectibles', {
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
    frames: anims.generateFrameNames('collectibles', {
      start: 1,
      end: 10,
      prefix: '',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'heart',
    frames: anims.generateFrameNames('collectibles', {
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
    frames: anims.generateFrameNames('collectibles', {
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
    frames: anims.generateFrameNames('collectibles', {
      start: 1,
      end: 10,
      prefix: 'star',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });
};

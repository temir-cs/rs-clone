export default (anims) => {
  anims.create({
    key: 'lamp1',
    frames: anims.generateFrameNames('lights', {
      start: 1,
      end: 4,
      prefix: 'lamp1_',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'lamp2',
    frames: anims.generateFrameNames('lights', {
      start: 1,
      end: 4,
      prefix: 'lamp2_',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'lamp3',
    frames: anims.generateFrameNames('lights', {
      start: 1,
      end: 4,
      prefix: 'lamp3_',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'lamp4',
    frames: anims.generateFrameNames('lights', {
      start: 1,
      end: 4,
      prefix: 'lamp4_',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'torch1',
    frames: anims.generateFrameNames('lights', {
      start: 1,
      end: 4,
      prefix: 'torch1_',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'torch2',
    frames: anims.generateFrameNames('lights', {
      start: 1,
      end: 4,
      prefix: 'torch2_',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'torch3',
    frames: anims.generateFrameNames('lights', {
      start: 1,
      end: 4,
      prefix: 'torch3_',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });
};

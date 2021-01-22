export default (anims) => {
  anims.create({
    key: 'skeleton-idle',
    frames: anims.generateFrameNames('skeleton', {
      start: 1,
      end: 3,
      prefix: 'skeleton_idle',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: -1,
  });
  anims.create({
    key: 'skeleton-walk',
    frames: anims.generateFrameNames('skeleton', {
      start: 1,
      end: 6,
      prefix: 'skeleton_walk',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: -1,
  });
  anims.create({
    key: 'skeleton-attack',
    frames: anims.generateFrameNames('skeleton', {
      start: 1,
      end: 3,
      prefix: 'skeleton_attack',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: -1,
  });
  anims.create({
    key: 'skeleton-hurt',
    frames: anims.generateFrameNames('skeleton', {
      start: 1,
      end: 2,
      prefix: 'skeleton_hurt',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: -1,
  });
  anims.create({
    key: 'skeleton-death',
    frames: anims.generateFrameNames('skeleton', {
      start: 1,
      end: 5,
      prefix: 'skeleton_death',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: -1,
  });
};

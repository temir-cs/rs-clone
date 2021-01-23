export default (anims) => {
  anims.create({
    key: 'vampire-idle',
    frames: anims.generateFrameNames('vampire', {
      start: 1,
      end: 3,
      prefix: 'vampire_idle',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: -1,
  });
  anims.create({
    key: 'vampire-walk',
    frames: anims.generateFrameNames('vampire', {
      start: 1,
      end: 3,
      prefix: 'vampire_walk',
      suffix: '.png'
    }),
    frameRate: 6,
    repeat: -1,
  });
  anims.create({
    key: 'vampire-attack',
    frames: anims.generateFrameNames('vampire', {
      start: 1,
      end: 4,
      prefix: 'vampire_attack',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: 0,
  });
  anims.create({
    key: 'vampire-hurt',
    frames: anims.generateFrameNames('vampire', {
      start: 1,
      end: 2,
      prefix: 'vampire_hurt',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: -1,
  });
  anims.create({
    key: 'vampire-death',
    frames: anims.generateFrameNames('vampire', {
      start: 1,
      end: 5,
      prefix: 'vampire_death',
      suffix: '.png'
    }),
    frameRate: 7,
    repeat: -1,
  });
};

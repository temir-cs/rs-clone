export default (anims) => {
  anims.create({
    key: 'imp-idle',
    frames: anims.generateFrameNames('imp', {
      start: 1,
      end: 3,
      prefix: 'Fire_Imp_idle',
      suffix: '.png'
    }),
    frameRate: 6,
    repeat: -1,
  });

  anims.create({
    key: 'imp-walk',
    frames: anims.generateFrameNames('imp', {
      start: 1,
      end: 6,
      prefix: 'Fire_Imp_walk',
      suffix: '.png'
    }),
    frameRate: 6,
    repeat: -1,
  });

  anims.create({
    key: 'imp-attack',
    frames: anims.generateFrameNames('imp', {
      start: 1,
      end: 5,
      prefix: 'Fire_Imp_attack',
      suffix: '.png'
    }),
    frameRate: 6,
    repeat: 0,
  });

  anims.create({
    key: 'imp-hurt',
    frames: anims.generateFrameNames('imp', {
      start: 1,
      end: 2,
      prefix: 'Fire_Imp_hurt',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: 0
  });

  anims.create({
    key: 'imp-death',
    frames: anims.generateFrameNames('imp', {
      start: 1,
      end: 4,
      prefix: 'Fire_Imp_death',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: 0
  });

  anims.create({
    key: 'imp-dead',
    frames: anims.generateFrameNames('imp', {
      start: 4,
      end: 4,
      prefix: 'Fire_Imp_death',
      suffix: '.png'
    }),
    frameRate: 1,
    repeat: -1
  });
};

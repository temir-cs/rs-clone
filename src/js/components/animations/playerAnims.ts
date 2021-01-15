export default (anims, hero) => {
  anims.create({
    key: 'idle',
    frames: anims.generateFrameNames(`${hero}`, {
      start: 1,
      end: 12,
      prefix: 'Idle/idle',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: 1,
  });

  anims.create({
    key: 'run',
    frames: anims.generateFrameNames(`${hero}`, {
      start: 1,
      end: 8,
      prefix: 'Run/run',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'jump',
    frames: anims.generateFrameNames(`${hero}`, {
      start: 1,
      end: 7,
      prefix: 'Jump/jump',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: 0
  });

  anims.create({
    key: 'midjump',
    frames: anims.generateFrameNames(`${hero}`, {
      start: 5,
      end: 10,
      prefix: 'High_Jump/high_jump',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: 0
  });

  anims.create({
    key: 'attack',
    frames: anims.generateFrameNames(`${hero}`, {
      start: 0,
      end: 4,
      prefix: 'Attack/attack',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: 0
  });

  anims.create({
    key: 'run-attack',
    frames: anims.generateFrameNames(`${hero}`, {
      start: 1,
      end: 8,
      prefix: 'Run_Attack/run_attack',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: 0
  });

  anims.create({
    key: 'death',
    frames: anims.generateFrameNames(`${hero}`, {
      start: 1,
      end: 10,
      prefix: 'Death/death',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: 0
  });
};

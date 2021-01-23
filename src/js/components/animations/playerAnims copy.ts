const ANIMS_DURATION = {
  knight: {
    idle: { start: 1, end: 12 },
    run: { start: 1, end: 8 },
    jump: { start: 1, end: 7 },
    midjump: { start: 5, end: 10 },
    crouch: { start: 1, end: 1 },
    'sword-attack': { start: 0, end: 4 },
    'run-attack': { start: 1, end: 8 },
    hurt: { start: 1, end: 4 },
    death: { start: 1, end: 10 }
  },
  mage: {
    idle: { start: 1, end: 14 },
    run: { start: 1, end: 8 },
    jump: { start: 1, end: 7 },
    midjump: { start: 5, end: 10 },
    crouch: { start: 1, end: 1 },
    'sword-attack': { start: 1, end: 7 },
    'run-attack': { start: 1, end: 8 },
    hurt: { start: 1, end: 4 },
    death: { start: 1, end: 10 }
  },
};

export default (anims, hero) => {
  anims.create({
    key: 'idle',
    frames: anims.generateFrameNames(`${hero}`, {
      start: ANIMS_DURATION[hero].idle.start,
      end: ANIMS_DURATION[hero].idle.end,
      prefix: 'Idle/idle',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: 1,
  });
  console.log(anims.get('idle'));
  anims.create({
    key: 'run',
    frames: anims.generateFrameNames(`${hero}`, {
      start: ANIMS_DURATION[hero].run.start,
      end: ANIMS_DURATION[hero].run.end,
      prefix: 'Run/run',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'jump',
    frames: anims.generateFrameNames(`${hero}`, {
      start: ANIMS_DURATION[hero].jump.start,
      end: ANIMS_DURATION[hero].jump.end,
      prefix: 'Jump/jump',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: 0
  });

  anims.create({
    key: 'midjump',
    frames: anims.generateFrameNames(`${hero}`, {
      start: ANIMS_DURATION[hero].midjump.start,
      end: ANIMS_DURATION[hero].midjump.end,
      prefix: 'High_Jump/high_jump',
      suffix: '.png'
    }),
    frameRate: 8,
    repeat: 0
  });

  anims.create({
    key: 'crouch',
    frames: anims.generateFrameNames(`${hero}`, {
      start: ANIMS_DURATION[hero].crouch.start,
      end: ANIMS_DURATION[hero].crouch.end,
      prefix: 'Jump/jump',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: 0
  });

  anims.create({
    key: 'sword-attack',
    frames: anims.generateFrameNames(`${hero}`, {
      start: ANIMS_DURATION[hero]['sword-attack'].start,
      end: ANIMS_DURATION[hero]['sword-attack'].end,
      prefix: 'Attack/attack',
      suffix: '.png'
    }),
    frameRate: 20,
    repeat: 0
  });

  anims.create({
    key: 'run-attack',
    frames: anims.generateFrameNames(`${hero}`, {
      start: ANIMS_DURATION[hero]['run-attack'].start,
      end: ANIMS_DURATION[hero]['run-attack'].end,
      prefix: 'Run_Attack/run_attack',
      suffix: '.png'
    }),
    frameRate: 20,
    repeat: 0
  });

  anims.create({
    key: 'hurt',
    frames: anims.generateFrameNames(`${hero}`, {
      start: ANIMS_DURATION[hero].hurt.start,
      end: ANIMS_DURATION[hero].hurt.end,
      prefix: 'Hurt/hurt',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  // anims.create({
  //   key: 'death',
  //   frames: anims.generateFrameNames(`${hero}`, {
  //     start: 1,
  //     end: 10,
  //     prefix: 'Death/death',
  //     suffix: '.png'
  //   }),
  //   frameRate: 8,
  //   repeat: 0
  // });
  anims.create({
    key: 'death',
    frames: anims.generateFrameNames(`${hero}`, {
      start: ANIMS_DURATION[hero].death.start,
      end: ANIMS_DURATION[hero].death.end,
      prefix: 'Death/death',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });
};

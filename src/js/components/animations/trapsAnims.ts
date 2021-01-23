export default (anims) => {
  anims.create({
    key: 'blade',
    frames: anims.generateFrameNames('traps', {
      start: 1,
      end: 3,
      prefix: 'Blade',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: -1
  });

  anims.create({
    key: 'fire-trap',
    frames: anims.generateFrameNames('traps', {
      start: 1,
      end: 10,
      prefix: 'fire_trap',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: 0
  });

  anims.create({
    key: 'fire-trap-idle',
    frames: anims.generateFrameNames('traps', {
      start: 10,
      end: 10,
      prefix: 'fire_trap',
      suffix: '.png'
    }),
    frameRate: 10,
    repeat: 0
  });

  anims.create({
    key: 'fire-trap-sleep',
    frames: anims.generateFrameNames('traps', {
      start: 1,
      end: 1,
      prefix: 'fire_trap',
      suffix: '.png'
    }),
    frameRate: 1,
    repeat: 0
  });

  anims.create({
    key: 'spike',
    frames: anims.generateFrameNames('traps', {
      start: 1,
      end: 4,
      prefix: 'spike',
      suffix: '.png'
    }),
    frameRate: 4,
    repeat: -1
  });

  anims.create({
    key: 'spikes-trap',
    frames: anims.generateFrameNames('traps', {
      start: 1,
      end: 5,
      prefix: 'spikes_trap',
      suffix: '.png'
    }),
    frameRate: 12,
    repeat: 0
  });
  anims.create({
    key: 'spikes-trap-hiding',
    frames: anims.generateFrameNames('traps', {
      start: 5,
      end: 1,
      prefix: 'spikes_trap',
      suffix: '.png'
    }),
    frameRate: 12,
    repeat: 0
  });
  anims.create({
    key: 'spikes-trap-idle',
    frames: anims.generateFrameNames('traps', {
      start: 5,
      end: 5,
      prefix: 'spikes_trap',
      suffix: '.png'
    }),
    frameRate: 15,
    repeat: -1
  });
  anims.create({
    key: 'spikes-trap-sleep',
    frames: anims.generateFrameNames('traps', {
      start: 1,
      end: 1,
      prefix: 'spikes_trap',
      suffix: '.png'
    }),
    frameRate: 15,
    repeat: -1
  });
};

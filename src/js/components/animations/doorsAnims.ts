export default (anims) => {
  anims.create({
    key: 'forest-door',
    frames: anims.generateFrameNames('doors', {
      start: 1,
      end: 5,
      prefix: 'castle_door',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: 0
  });

  anims.create({
    key: 'forest-door-idle',
    frames: anims.generateFrameNames('doors', {
      start: 1,
      end: 1,
      prefix: 'castle_door',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'castle-door',
    frames: anims.generateFrameNames('doors', {
      start: 1,
      end: 5,
      prefix: 'cave-door',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: 0
  });

  anims.create({
    key: 'castle-door-idle',
    frames: anims.generateFrameNames('doors', {
      start: 1,
      end: 1,
      prefix: 'cave-door',
      suffix: '.png'
    }),
    frameRate: 5,
    repeat: -1
  });
};

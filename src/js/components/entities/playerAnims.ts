export default (anims) => {
  anims.create({
    key: 'idle',
    frames: anims.generateFrameNumbers('player', { start: 0, end: 1 }),
    frameRate: 1,
    repeat: -1
  });

  anims.create({
    key: 'run',
    frames: anims.generateFrameNumbers('player', { start: 8, end: 13 }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'jump',
    frames: anims.generateFrameNumbers('player', { start: 21, end: 22 }),
    frameRate: 1,
    repeat: 1
  });
};

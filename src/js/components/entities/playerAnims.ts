export default (anims) => {
  anims.create({
    key: 'idle',
    frames: anims.generateFrameNumbers('player', { start: 0, end: 5 }),
    frameRate: 8,
    repeat: -1
  });

  anims.create({
    key: 'run',
    frames: anims.generateFrameNumbers('player', { start: 8, end: 14 }),
    frameRate: 5,
    repeat: -1
  });

  anims.create({
    key: 'jump',
    frames: anims.generateFrameNumbers('player', { start: 15, end: 21 }),
    frameRate: 1,
    repeat: 1
  });
};

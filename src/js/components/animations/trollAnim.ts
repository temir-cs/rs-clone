export default (anims) => {
  anims.create({
    key: 'troll-idle',
    frames: anims.generateFrameNumbers('troll', { start: 5, end: 9 }),
    frameRate: 4,
    repeat: -1,
  });
};

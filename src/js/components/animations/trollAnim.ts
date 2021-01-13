export default (anims) => {
  anims.create({
    key: 'troll-idle',
    frames: anims.generateFrameNumbers('troll', { start: 5, end: 10 }),
    frameRate: 5,
    repeat: -1,
  });
};

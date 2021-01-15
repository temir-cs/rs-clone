export default (anims) => {
  anims.create({
    key: 'troll-idle',
    frames: anims.generateFrameNames('troll', {
      start: 1, 
      end: 6,
      prefix: 'walk',
      suffix: '.png'
    }),
    frameRate: 6,
    repeat: -1,
  });
};

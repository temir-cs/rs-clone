export default (anims) => {
  anims.create({
    key: 'tesla-ball',
    frames: anims.generateFrameNames('tesla-ball', {
      start: 9,
      end: 24,
      prefix: 'tesla_ball',
      suffix: '.png'
    }),
    frameRate: 20,
    repeat: -1
  });
};

export default (anims) => {
  anims.create({
    key: 'fire-hit-effect',
    frames: anims.generateFrameNames('fire-hit-sheet', {
      start: 0,
      end: 4,
    }),
    frameRate: 10,
    repeat: 0,
  });
};

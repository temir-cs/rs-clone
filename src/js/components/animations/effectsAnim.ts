export default (anims) => {
  anims.create({
    key: 'sword-hit',
    frames: anims.generateFrameNames('weapon-effects', {
      start: 1,
      end: 7,
      prefix: 'Sun_strike',
      suffix: '.png'
    }),
    frameRate: 20,
    repeat: 0
  });

  anims.create({
    key: 'explosion-hit',
    frames: anims.generateFrameNames('weapon-effects', {
      start: 1,
      end: 9,
      prefix: 'Explosion',
      suffix: '.png'
    }),
    frameRate: 20,
    repeat: 0
  });

  anims.create({
    key: 'fire-projectile',
    frames: anims.generateFrameNames('weapon-effects', {
      start: 3,
      end: 6,
      prefix: 'fire',
      suffix: '.png'
    }),
    frameRate: 15,
    repeat: -1
  });
};

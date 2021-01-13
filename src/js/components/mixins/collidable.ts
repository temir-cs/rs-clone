import * as Phaser from 'phaser';

export default {
  addCollider(gameObject, callback) {
    this.scene.physics.add.collider(this, gameObject, callback, null, this);
    return this;
  },

  bodyPositionDifferenceX: 0,
  prevRay: null,
  prevHasHit: null,

  raycast(body, rayLength = 30, precision = 0, steepness = 1) {
    const { x, y, width, halfHeight } = body;

    this.bodyPositionDifferenceX += body.x - body.prev.x;

    if ((Math.abs(this.bodyPositionDifferenceX) <= precision) && this.prevHasHit !== null) {
      return {
        ray: this.prevRay,
        hasHit: this.prevHasHit
      };
    }
    const line = new Phaser.Geom.Line();
    let hasHit = false;

    switch (body.facing) {
      case Phaser.Physics.Arcade.FACING_RIGHT:
        line.x1 = x + width;
        line.y1 = y + halfHeight;
        line.x2 = line.x1 + rayLength * steepness;
        line.y2 = line.y1 + rayLength;
        break;
      case Phaser.Physics.Arcade.FACING_LEFT:
        line.x1 = x;
        line.y1 = y + halfHeight;
        line.x2 = line.x1 - rayLength * steepness;
        line.y2 = line.y1 + rayLength;
        break;
      default:
        break;
    }

    const hits = this.collidersLayer.getTilesWithinShape(line);
    console.log(hits.length)
    if (hits.length > 0) {
      hasHit = hits.some((hit) => hit.index !== -1);
      this.prevHasHit = hasHit;
    }

    this.prevRay = line;
    this.bodyPositionDifferenceX = 0;
    return { ray: line, hasHit };
  }
};

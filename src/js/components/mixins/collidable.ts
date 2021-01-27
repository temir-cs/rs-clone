import * as Phaser from 'phaser';

interface colliderType {
  addCollider: (otherGameobject: Phaser.Tilemaps.TilemapLayer | Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.StaticGroup | Phaser.GameObjects.Group,
              callback: (()=>void) | ((entity:any, collectable:any)=>void) | ((entity: any, source: any)=>void),
              context: Phaser.Scene) => colliderType;
  addOverlap: (gameObject: Phaser.Tilemaps.TilemapLayer | Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.StaticGroup | Phaser.GameObjects.Group,
              callback: (()=>void) | ((entity:any, collectable:any)=>void) | ((entity: any, source: any)=>void),
              context: Phaser.Scene) => colliderType;
  bodyPositionDifferenceX: number;
  prevRay: Phaser.Geom.Line;
  prevHasHit: boolean;
  rayCast: (body: Phaser.Physics.Arcade.Body, rayLength:number, precision:number, steepness:number)
            =>{ray: Phaser.Geom.Line, hasHit: boolean};
}

export default {
  addCollider(otherGameobject: Phaser.Tilemaps.TilemapLayer | Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.StaticGroup | Phaser.GameObjects.Group,
              callback: (()=>void) | ((entity:any, collectable:any)=>void) | ((entity: any, source: any)=>void),
              context: Phaser.Scene):colliderType {
    this.scene.physics.add.collider(this, otherGameobject, callback, null, context || this);
    return this;
  },

  addOverlap(gameObject: Phaser.Tilemaps.TilemapLayer | Phaser.Physics.Arcade.Sprite | Phaser.Physics.Arcade.StaticGroup | Phaser.GameObjects.Group,
              callback: (()=>void) | ((entity:any, collectable:any)=>void) | ((entity: any, source: any)=>void),
              context: Phaser.Scene):colliderType {
    this.scene.physics.add.overlap(this, gameObject, callback, null, context || this);
    return this;
  },

  bodyPositionDifferenceX: 0,
  prevRay: null,
  prevHasHit: null,

  raycast(body: Phaser.Physics.Arcade.Body, rayLength = 30, precision = 0, steepness = 1):{ray: Phaser.Geom.Line, hasHit: boolean} {
    const { x, y, width, height } = body;

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
        line.y1 = y + height;
        line.x2 = line.x1 + rayLength * steepness;
        line.y2 = line.y1 + rayLength;
        break;
      case Phaser.Physics.Arcade.FACING_LEFT:
        line.x1 = x;
        line.y1 = y + height;
        line.x2 = line.x1 - rayLength * steepness;
        line.y2 = line.y1 + rayLength;
        break;
      default:
        break;
    }

    const hits = this.collidersLayer.getTilesWithinShape(line);
    if (hits.length > 0) {
      hasHit = hits.some((hit) => hit.index !== -1);
      this.prevHasHit = hasHit;
    }

    this.prevRay = line;
    this.bodyPositionDifferenceX = 0;
    return { ray: line, hasHit };
  }
};

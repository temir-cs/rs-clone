import * as Phaser from 'phaser';
import Coin from '../collectables/Coin';

class Collectables extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene:Phaser.Scene) {
    super(scene.physics.world, scene);

    this.createFromConfig({
      classType: Coin
    });
  }

  mapProperties(propertiesList) {
    if (!propertiesList || propertiesList.length === 0) { return {}; }
    return propertiesList.reduce((map, obj) => {
      map[obj.name] = obj.value;
      return map;
    }, {});
  }

  addFromLayer(layer) {
    const { score: defaultScore, type } = this.mapProperties(layer.properties);

    layer.objects.forEach((collectableO) => {
      const collectable = this.get(collectableO.x, collectableO.y, type);
      const props = this.mapProperties(collectableO.properties);

      collectable.score = props.score || defaultScore;
   });
  }
}

export default Collectables;

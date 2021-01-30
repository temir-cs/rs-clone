import * as Phaser from 'phaser';
import Coin from '../collectables/Coin';
import { collectablesProperties } from '../interfaces/interfaces';

class Collectables extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene:Phaser.Scene) {
    super(scene.physics.world, scene);

    this.createFromConfig({
      classType: Coin
    });
  }

  addFromLayer(layer:Phaser.Tilemaps.ObjectLayer):void{
    function mapProperties(propertiesList: any) {
      if (!propertiesList || propertiesList.length === 0) { return {}; }
      const [result] = propertiesList;
      return result.reduce((acc, current) => {
        const mapReassigned = acc;
        mapReassigned[current.name] = current.value;
        return mapReassigned;
      }, {});
    }

    const { score: defaultScore, type } = mapProperties(Array.of(layer.properties));

    layer.objects.forEach((collectableO) => {
      const collectable = this.get(collectableO.x, collectableO.y, type);
      const props = mapProperties(collectableO.properties);

      collectable.score = props.score || defaultScore;
   });
  }
}

export default Collectables;

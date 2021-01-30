import * as Phaser from 'phaser';
import COLLECTABLE_TYPES from '../types/collectablesTypes';
import { collectablesProperties, CollectablesTypesInterface } from '../interfaces/interfaces';

class Collectables extends Phaser.Physics.Arcade.StaticGroup {
  types: CollectablesTypesInterface;

  constructor(scene:Phaser.Scene, collectableName: string) {
    super(scene.physics.world, scene);
    this.types = COLLECTABLE_TYPES;

    this.createFromConfig({
      classType: this.types[collectableName]
    });
  }

  addFromLayer(layer:Phaser.Tilemaps.ObjectLayer):void{
    function mapProperties(propertiesList: collectablesProperties[]) {
      if (!propertiesList || propertiesList.length === 0) { return {}; }
      // const [result] = propertiesList;
      return propertiesList.reduce((acc, current) => {
        const mapReassigned = acc;
        mapReassigned[current.name] = current.value;
        return mapReassigned;
      }, {});
    }

    // const { score: defaultScore, type: defaultType } = mapProperties(Array.of(layer.properties));
    const defaultScore = layer.properties[0].value;
    const defaultType = layer.properties[1].value;

    layer.objects.forEach((collectableO) => {
      const collectable = this.get(collectableO.x, collectableO.y, defaultType);
      const props = mapProperties(collectableO.properties);

      collectable.score = props.score || defaultScore;
   });
  }
}

export default Collectables;

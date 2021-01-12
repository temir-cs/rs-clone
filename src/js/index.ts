import * as Phaser from 'phaser';

import PlayScene from './components/scenes/Play';
import PreloadScene from './components/scenes/Preload';

const MAP_WIDTH: number = 3200;

const WIDTH: number = document.body.offsetWidth;
const HEIGHT: number = 600;

const SHARED_CONFIG: {
    mapOffset: number,
    width: number,
    height: number
  } = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
};

const Scenes = [PreloadScene, PlayScene];
const createScene = (Scene: any):Phaser.Scene => new Scene(SHARED_CONFIG);
const iniScenes = () => Scenes.map(createScene);

const config: Phaser.Types.Core.GameConfig = {
  title: 'Game',
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  render: {
    pixelArt: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    }
  },
  scene: iniScenes(),
  parent: 'game',
};

window.onload = () => {
  const game = new Phaser.Game(config);
};

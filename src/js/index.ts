import * as Phaser from 'phaser';

import PlayScene from './components/scenes/Play';
import PreloadScene from './components/scenes/Preload';

const MAP_WIDTH: number = 3200;
const MAP_HEIGHT: number = 1080;
const WIDTH: number = document.body.offsetWidth;
const HEIGHT: number = 800;
// const HEIGHT: number = document.body.offsetHeight;
const ZOOM_FACTOR: number = 1;

const SHARED_CONFIG: {
    mapOffset: number,
    heightOffset: number,
    width: number,
    height: number,
    zoomFactor: number,
    debug: boolean,
    leftTopCorner: any,
    rightTopCorner: any
  } = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  heightOffset: MAP_HEIGHT > HEIGHT ? MAP_HEIGHT - HEIGHT : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  debug: true,
  leftTopCorner: {
    x: (WIDTH - (WIDTH / ZOOM_FACTOR)) / 2,
    y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2
  },
  rightTopCorner: {
    x: ((WIDTH / ZOOM_FACTOR) + ((WIDTH - (WIDTH / ZOOM_FACTOR)) / 2)),
    y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2
  }
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
       debug: SHARED_CONFIG.debug,
    }
  },
  scene: iniScenes(),
  parent: 'game',
};

window.onload = () => {
  const game = new Phaser.Game(config);
};

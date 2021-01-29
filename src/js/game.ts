import * as Phaser from 'phaser';

import PlayScene from './components/scenes/Play';
import PreloadScene from './components/scenes/Preload';
import MenuScene from './components/scenes/Menu';
import HeroSelectScene from './components/scenes/HeroSelectScene';
import LevelsScene from './components/scenes/LevelsScene';
import GameOverScene from './components/scenes/GameOverScene';
import Highscore from './components/scenes/Highscore';
import SettingsScene from './components/scenes/SettingsScene';
import { SceneConfig } from './components/interfaces/interfaces';

const MAP_WIDTH = 3200;
const MAP_HEIGHT = 1280;
// const WIDTH: number = document.body.offsetWidth;
const WIDTH = 960;
const HEIGHT = 540;
// const HEIGHT: number = document.body.offsetHeight;
const ZOOM_FACTOR = 1;

const SHARED_CONFIG: SceneConfig = {
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
  },
  rightBottomCorner: {
    x: ((WIDTH / ZOOM_FACTOR) + ((WIDTH - (WIDTH / ZOOM_FACTOR)) / 2)),
    y: ((HEIGHT / ZOOM_FACTOR) + ((HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2)),
  },
};

const Scenes = [PreloadScene, MenuScene, HeroSelectScene, LevelsScene, PlayScene, GameOverScene, Highscore, SettingsScene];
interface Constructable<T> {
  new(args: SceneConfig) : T;
}
type ScenesType = Constructable<PreloadScene>
                | Constructable<MenuScene>
                | Constructable<HeroSelectScene>
                | Constructable<LevelsScene>
                | Constructable<PlayScene>
                | Constructable<GameOverScene>
                | Constructable<Highscore>
                | Constructable<SettingsScene>;

const createScene = (Scene: ScenesType):Phaser.Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

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
  scene: initScenes(),
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  },
  parent: 'game',
};

// window.onload = () => {
//   const game = new Phaser.Game(config);
// };

export default function startGame():void {
   const game = new Phaser.Game(config);
}

import Troll from '../entities/Troll';
import Imp from '../entities/Imp';
import Skeleton from '../entities/Skeleton';
import Vampire from '../entities/Vampire';
import Boss from '../entities/Boss';

import FireTrap from '../entities/FireTrap';
import SpikesTrap from '../entities/SpikesTrap';

import Projectile from '../attacks/Projectile';
import MeleeWeapon from '../attacks/MeleeWeapon';
import Player from '../entities/Player';
import Enemy from '../entities/Enemy';
import Collectable from '../collectables/Collectable';
import Coin from '../collectables/Coin';
import Potion from '../collectables/Potion';

export interface EnemiesTypesInterface {
  Troll: typeof Troll;
  Imp: typeof Imp;
  Skeleton: typeof Skeleton;
  Vampire: typeof Vampire;
  Boss: typeof Boss;
}

export interface TrapsTypesInterface {
  FireTrap: typeof FireTrap;
  SpikesTrap: typeof SpikesTrap;
}

export interface CollectablesTypesInterface {
  Coin: typeof Coin;
  Potion: typeof Potion;
}

export interface collectablesProperties {
  name?: string;
  type?: string;
  value?: string | number;
  score?: number;
}

export interface Stats {
  coins: number;
  kills: number;
}

export interface SceneConfig {
  mapOffset: number;
  heightOffset: number;
  width: number;
  height: number;
  zoomFactor: number;
  debug: boolean;
  leftTopCorner: {x: number, y: number};
  rightTopCorner: {x: number, y: number};
  rightBottomCorner: {x: number, y: number};
  canGoBack?: boolean;
}

export interface FontConfig {
  fontSize: string;
  fontStyle: string;
  fontFamily: string;
  fill: string;
}

export interface MenuType {
  scene?: string;
  text?: string;
  textGameObject?: Phaser.GameObjects.Text;
  level?: number;
}

export interface colliderType {
  addCollider: (otherGameobject: Phaser.Tilemaps.TilemapLayer | Phaser.Physics.Arcade.Sprite
                | Phaser.Physics.Arcade.StaticGroup | Phaser.GameObjects.Group,
                callback?: (()=>void) | ((entity: Player, collectable: Collectable)=>void)
                | ((enemy: Projectile | MeleeWeapon, player: Player)=>void) |
                ((entity: Player | Enemy, source: Projectile | MeleeWeapon)=>void),
                context?: Phaser.Scene) => colliderType;
  addOverlap: (gameObject: Phaser.Tilemaps.TilemapLayer | Phaser.Physics.Arcade.Sprite
                | Phaser.Physics.Arcade.StaticGroup | Phaser.GameObjects.Group,
                callback?: (()=>void) | ((entity: Player, collectable: Collectable)=>void)
                | ((entity: Player | Enemy, source: Projectile | MeleeWeapon)=>void),
                context?: Phaser.Scene) => colliderType;
  bodyPositionDifferenceX: number;
  prevRay: Phaser.Geom.Line;
  prevHasHit: boolean;
  rayCast: (body: Phaser.Physics.Arcade.Body, rayLength:number, precision:number, steepness:number)
            =>{ray: Phaser.Geom.Line, hasHit: boolean};
}

export interface JSONWelcomeScreen {
    howToPlay: string;
    howToPlayText: string;
    article: string;
    articleText: string;
    articleLink: string;
    articleCopyrightLink: string;
    articlePopUp01: string;
    articlePopUp02: string;
    team: string;
    teamText: string;
    teamMemberName01: string;
    teamMemberDescr01: string;
    teamMemberName02: string;
    teamMemberStriked: string;
    teamMemberDescr02: string;
    teamMemberName03: string;
    teamMemberDescr03: string;
    teamMemberName04: string;
    teamMemberDescr04: string;
    letsGo: string;
    close: string;
    description: string;
    usernameWarning: string;
    usernameTakenWarning: string;
    userDoesNotExistWarning: string;
    regAndGo: string;
    autoAndGo: string;
    haveLogin: string;
    signInBtn: string;
    signUpBtn: string;
    firstTime: string;
    getLang: string;
    switchLang: string;
}

export interface JSONMenu {
    playBtn: string;
    levelsBtn: string;
    highscoreBtn: string;
    settingBtn: string;
}

export interface JSONLevels {
    first: string;
    second: string;
    third: string;
    fourth: string;
}

export interface JSONHeroSelectScene {
    knightName: string;
    knightClass: string;
    knightCombat: string;
    knightHealth: string;
    knightSpeed: string;
    mageName: string;
    mageClass: string;
    mageCombat: string;
    mageHealth: string;
    mageSpeed: string;
}

export interface JSONSettingsScene {
    fullScreen: string;
    lang: string;
}

export interface JSONGameOverScene {
    gameOver: string;
    totalKills: string;
    totalCoins: string;
    newGame: string;
    mainMenu: string;
}

export interface JSONRU {
    WelcomeScreen: JSONWelcomeScreen;
    Menu: JSONMenu;
    Levels: JSONLevels;
    HeroSelectScene: JSONHeroSelectScene;
    SettingsScene: JSONSettingsScene;
    GameOverScene:JSONGameOverScene;
}
export interface JSONEN {
    WelcomeScreen: JSONWelcomeScreen;
    Menu: JSONMenu;
    Levels: JSONLevels;
    HeroSelectScene: JSONHeroSelectScene;
    SettingsScene: JSONSettingsScene;
    GameOverScene: JSONGameOverScene;
}

import Troll from '../entities/Troll';
import Imp from '../entities/Imp';
import Skeleton from '../entities/Skeleton';
import Vampire from '../entities/Vampire';
import Boss from '../entities/Boss';

import FireTrap from '../entities/FireTrap';
import SpikesTrap from '../entities/SpikesTrap';

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
export interface Stats {
  coins: number;
  kills: number;
}

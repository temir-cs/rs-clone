import Troll from '../entities/Troll';
import Imp from '../entities/Imp';
import Skeleton from '../entities/Skeleton';
import Vampire from '../entities/Vampire';

import FireTrap from '../entities/FireTrap';
import SpikesTrap from '../entities/SpikesTrap';

export interface EnemiesTypesInterface {
  Troll: typeof Troll;
  Imp: typeof Imp;
  Skeleton: typeof Skeleton;
  Vampire: typeof Vampire;
}

export interface TrapsTypesInterface {
  FireTrap: typeof FireTrap;
  SpikesTrap: typeof SpikesTrap;
}
import * as migration_20260605_135653 from './20260605_135653';
import * as migration_20260610_131056 from './20260610_131056';
import * as migration_20260610_160652 from './20260610_160652';
import * as migration_20260615_203534 from './20260615_203534';

export const migrations = [
  {
    up: migration_20260605_135653.up,
    down: migration_20260605_135653.down,
    name: '20260605_135653',
  },
  {
    up: migration_20260610_131056.up,
    down: migration_20260610_131056.down,
    name: '20260610_131056',
  },
  {
    up: migration_20260610_160652.up,
    down: migration_20260610_160652.down,
    name: '20260610_160652',
  },
  {
    up: migration_20260615_203534.up,
    down: migration_20260615_203534.down,
    name: '20260615_203534'
  },
];

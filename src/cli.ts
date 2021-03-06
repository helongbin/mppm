#!/usr/bin/env node
import { execSync } from 'child_process';
import { resolve } from 'path';
import { executeSpawn } from './utils/execute';
import { logError, logNormal, logInfo } from './utils/log';

const changed = () => {
  const file = resolve(__dirname, './commands/changed');
  logNormal(execSync(`node ${file}`).toString());
};

const bootstrap = () => {
  logInfo('mppm info: ', 'will execute "bootstrap"');
  const file = resolve(__dirname, './commands/bootstrap');

  executeSpawn(
    'node',
    [`${file}`],
    {},
    () => {
      logInfo('mppm info: ', 'execute "bootstrap" successfully');
      process.exit(0);
    },
  );
};

const publish = () => {
  logInfo(`mppm info: `, `will publish packages`);
  const file = resolve(__dirname, './commands/publish');
  executeSpawn(
    'node',
    [`${file}`],
    {},
    () => {
      logInfo(`mppm info: `, `execute "publish" successfully`);
      process.exit(0);
    },
  );
};

const run = (mppmArgvs: string[]) => {
  logInfo(`mppm info: `, `will execute "npm run ${mppmArgvs[1]}" for each package`);
  const file = resolve(__dirname, './commands/run');
  const argvs = mppmArgvs.join(' ');

  executeSpawn(
    'node',
    [`${file}`, `${argvs}`],
    {},
    () => {
      logInfo(`mppm info: `, `execute "run ${mppmArgvs[1]}" successfully`);
      process.exit(0);
    },
  );
};

const mppmArgvs = process.argv.slice(2);

switch (mppmArgvs[0]) {
  case 'changed': changed(); break;
  case 'bootstrap': bootstrap(); break;
  case 'publish': publish(); break;
  case 'run': run(mppmArgvs); break;
  default: logError('mppm error: ', 'argv is invalid'); execSync('exit 1'); break;
}

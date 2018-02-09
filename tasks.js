import Start from 'start';
import reporter from 'start-pretty-reporter';
import env from 'start-env';
import files from 'start-files';
import watch from 'start-watch';
import clean from 'start-clean';
import read from 'start-read';
import babel from 'start-babel';
import write from 'start-write';
import eslint from 'start-eslint';
import mocha from 'start-mocha';
import * as istanbul from 'start-istanbul';
import codecov from 'start-codecov';
 
const start = Start(reporter());
 
export const build = () => start(
  env('NODE_ENV', 'production'),
  files('build/'),
  clean(),
  files('lib/**/*.js'),
  read(),
  babel(),
  write('build/')
);
 
export const dev = () => start(
  env('NODE_ENV', 'development'),
  files('build/'),
  clean(),
  files('lib/**/*.js'),
  watch((file) => start(
    files(file),
    read(),
    babel(),
    write('build/')
  ))
);
 
export const lint = () => start(
  files([ 'lib/**/*.js', 'test/**/*.js' ]),
  eslint()
);
 
export const test = () => start(
  env('NODE_ENV', 'test'),
  files('test/**/*.js'),
  mocha()
);
 
export tdd = () => start(
  files([ 'lib/**/*.js', 'test/**/*.js' ]),
  watch(test)
);
 
export coverage = () => start(
  env('NODE_ENV', 'test'),
  files('coverage/'),
  clean(),
  files('lib/**/*.js'),
  istanbul.instrument(),
  test,
  istanbul.report()
);
 
export ci = () => start(
  lint,
  coverage,
  files('coverage/lcov.info'),
  read(),
  codecov()
);
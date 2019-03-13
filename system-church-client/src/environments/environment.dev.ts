// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://urd.tjba.jus.br:9011/banco-docentes/',
  packageFile: './../../../../package.json',
  VERSION: require('../../package.json').version
};



import {bar} from './mb'; // (i)
export function foo () {
  console.log('execute in foo in ma.js, call bar()');
  bar(); // (ii)
}

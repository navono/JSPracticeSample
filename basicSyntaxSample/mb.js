import {foo} from './ma'; // (iii)
export function bar () {
  if (Math.random() < 0.5) {
    console.log('execute in bar in mb.js, call foo()');
    foo(); // (iv)
  }
}

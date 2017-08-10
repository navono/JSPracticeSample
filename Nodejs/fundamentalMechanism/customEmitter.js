const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred');
});

console.log('start...');
setTimeout(() => {
  myEmitter.emit('event');
}, 2000);

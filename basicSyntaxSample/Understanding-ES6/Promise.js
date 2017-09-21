//**************************************************************************** */
// Node.js 代码
// Promise life cycle
// pending
// Fulfilled
// Rejected

const fs = require('fs');

function readFile(filename) {
  return new Promise((resolve, reject) => {
    // 触发异步任务
    fs.readFile(filename, { encoding: 'utf-8' }, (err, contens) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(contens);
    });
  });
}

let rfPromise = readFile('SetMapa.js');
rfPromise.then(
  contents => {
    console.log(contents);
  },
  err => {
    console.log(err.message);
  }
);

//**************************************************************************** */
// ES6中，在Promise对象rejected后，如果没有在then中
// 显式地捕捉，那么此rejected就会无声无息地消失。
// 因此在Node中，通过 process 提供了两个事件：
// unhandledRejection: 在一次事件轮询中，当一个 promise 处于 rejected 状态却没有 rejection 处理它，该事件会被触发。
// rejectionHandled: 在一次事件轮询之后，如果存在 rejected 状态的 promise 并已被 rejection 处理过，该事件会被触发。

// 设计这些事件的目的是为了帮助辨识未处理的 rejected 状态的 promise 。

let rejected;

process.on('unhandledRejection', (reason, promise) => {
  console.log(reason.message);
  console.log(rejected == promise);
});

rejected = Promise.reject(new Error('Explosion!'));


//**************************************************************************** */
// Promise 链
// 错误捕获
let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});

p1.then(function(value) {
  console.log(value);
  return value + 1
}).then(function(value) {
  console.log(value);
  console.log("Finished");

  throw new Error("Boom!");
}).catch(function(error) {
  console.log(error.message);     // "Boom!"
});


//**************************************************************************** */
// 多个Promise
// Promise.all Promise.race

let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
  resolve(43);
});

let p3 = new Promise(function(resolve, reject) {
  resolve(44);
});

let p4 = Promise.all([p1, p2, p3]);

p4.then(function(value) {
  console.log(Array.isArray(value));  // true
  console.log(value[0]);              // 42
  console.log(value[1]);              // 43
  console.log(value[2]);              // 44
});


// reject发生
let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});

let p2 = new Promise(function(resolve, reject) {
  reject(43);
});

let p3 = new Promise(function(resolve, reject) {
  resolve(44);
});

let p4 = Promise.all([p1, p2, p3]);

p4.catch(function(value) {
  console.log(Array.isArray(value))   // false
  console.log(value);                 // 43
});


//**************************************************************************** */
// 继承

class MyPromise extends Promise {
  // 使用默认的构造函数

  success(resolve, reject) {
      return this.then(resolve, reject);
  }

  failure(reject) {
      return this.catch(reject);
  }
}
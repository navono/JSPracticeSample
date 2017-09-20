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

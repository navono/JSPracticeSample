/*
 * @Author: Ping Qixing
 * @Date: 2017-06-18 08:08:07
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-18 08:42:05
 * @Description
 */

function timeout (ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    })
}

timeout(200).then(value => {
    console.log(value);
})

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('fail')), 3000);
})

// p2因为resolve的是另一个Promise对象，因此会以它返回的Promise对象
// 的最终状态最为p2的最终状态
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(p1), 1000);
})

p2
.then(result => console.log(result))
.catch(error => console.log(error));

// Promise有一些静态方法用来封装多个Promise对象

// Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法
let thenable = {
    then (resolve, reject) {
        resolve(42);
    }
}

let p3 = Promise.resolve(thenable);
p3.then(value => console.log(value));

setTimeout(function () {
    console.log('three');
}, 0);

// 立即resolve的Promise对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时
Promise.resolve().then(function () {
    console.log('two');
});

console.log('one');

const f = () => console.log('now');
(async () => f())();
console.log('next');

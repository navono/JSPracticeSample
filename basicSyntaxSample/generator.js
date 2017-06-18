/*
 * @Author: Ping Qixing
 * @Date: 2017-06-18 10:52:17
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-18 15:25:16
 * @Description
 */
// import { thunkify } from 'thunkify';

function * helloworldGenerator () {
    yield 'hello';
    yield 'world';
    return 'ending';
}
// 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象
// 下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，
// 内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。
// 换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

let hw = helloworldGenerator();

// for (let i of hw) {
//     console.log(i);
// }

console.log(hw.next());

let arr = [1, [[2, 3], 4], [5, 6]];

let flat = function * (a) {
    let length = a.length;
    for (let i = 0; i < length; i++) {
        let item = a[i];
        if (typeof item !== 'number') {
            yield * flat(item);
        } else {
            yield item;
        }
    }
};

for (var f of flat(arr)) {
    console.log(f);
}

// yield表达式本身没有返回值，或者说总是返回undefined
// 由于next方法的参数表示上一个yield表达式的返回值，所以第一次使用next方法时，不能带有参数
function * foo (x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }

// 一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象

// 原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。
function * objectEntries (obj) {
    let propKeys = Reflect.ownKeys(obj);

    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}

let jane = { first: 'Jane', last: 'Doe' };

// for (let [key, value] of objectEntries(jane)) {
//     console.log(`${key}: ${value}`);
// }

// another implemention
function * objectEntries2 () {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}

jane[Symbol.iterator] = objectEntries2;
for (let [key, value] of jane) {
    console.log(`${key}: ${value}`);
}

// Generator与状态机
// ES5
let ticking = true;
let clock = function () {
    if (ticking) {
        console.log('Tick!');
    } else {
        console.log('Tock!');
    }
    ticking = !ticking;
}

// ES6
let clock2 = function * () {
    while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
};

// Thunk函数， 实际中可以使用thunkify模块
const Thunk = function (fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        }
    }
}

// 比如这样使用
// let readFileThunk = Thunk(fs.readFile);
// readFileThunk(fileA)(callback);

function faz (a, cb) {
    cb(a);
}

const fazt = Thunk(faz);
fazt(1)(console.log);

// let thunkify = require('thunkify');

// const ft = thunkify(faz);
// ft(2)(console.log);

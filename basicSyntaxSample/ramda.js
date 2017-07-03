/*
 * @Author: Ping Qixing
 * @Date: 2017-07-03 08:44:15
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-07-03 13:08:26
 * @Description
 */
import R from 'ramda';

let square = n => n * n;

let r = R.map(square, [4, 8]);
// console.log(r);
// or (推荐)
r = R.map(square)([4, 8]);
// or
let mapSquare = R.map(square);
r = mapSquare([4, 8]);

// Ramda 包含了：
// 比较运算
// 书序也运算
// 逻辑运算
// 字符串

// 函数
// 从右到左执行
let r2 = R.compose(Math.abs, R.add(1), R.multiply(2))(-4);
// console.log(r2);

let negative = x => -1 * x;
let increaseOne = x => x + 1;

// 从左到右执行
let fn = R.pipe(Math.pow, negative, increaseOne);
let r3 = fn(3, 4);
console.log(r3);

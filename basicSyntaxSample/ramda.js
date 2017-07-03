/*
 * @Author: Ping Qixing
 * @Date: 2017-07-03 08:44:15
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-07-03 12:57:41
 * @Description
 */
import R from 'ramda';

console.log('ramda');
let square = n => n * n;
console.log(R.map(square, [4, 8]));

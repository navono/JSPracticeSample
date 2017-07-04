/*
 * @Author: Ping Qixing
 * @Date: 2017-07-03 08:44:15
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-07-04 13:57:31
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

// 接受两个参数，第一个参数是函数，第二个参数是函数数组。
// 传入的值先使用第二个参数包含的函数分别处理以后，再用第一个参数处理前一步生成的结果。
let sumOfArr = arr => {
  let sum = 0;
  arr.forEach(i => sum += i);
  return sum;
}

let lenghtOfArr = arr => arr.length;
let average = R.converge(R.divide, [sumOfArr, lenghtOfArr]);
let r4 = average([1, 2, 3, 4, 5, 6, 7]);
// 相当于 28 除以 7

// 柯里化（将多参数的函数，转换成单参数的形式）
let addFourNumbers = (a, b, c, d) => a + b + c + d;
let curriedAddFourNumbers = R.curry(addFourNumbers);
let fn2 = curriedAddFourNumbers(1, 2);
let gn = fn2(3);
gn(4); // 10

// 允许多参数的函数接受一个数组，指定最左边的部分参数。
// partialRight，指定最右边的参数
let greet = (salutation, title, firstName, lastName) => `${salutation}, ${title} ${firstName} ${lastName}!`;
let sayHello = R.partial(greet, ['Hello']);
let sayHelloToMs = R.partial(sayHello, ['Ms.']);
let r5 = sayHelloToMs('Jane', 'Jones');

// useWith：接受一个函数fn和一个函数数组fnList作为参数，返回fn的柯里化版本。
// 该新函数的参数，先分别经过对应的fnList成员处理，再传入fn执行。
let decreaseOne = x => x - 1;
let r6 = R.useWith(Math.pow, [decreaseOne, increaseOne])(3, 4);

// memoize：返回一个函数，会缓存每一次的运行结果。
// complement：返回一个新函数，如果原函数返回true，该函数返回false；如果原函数返回false，该函数返回true。

// 将一个值传入指定函数，并返回该值。
let sayX = x => console.log('x is ' + x);
R.tap(sayX)(100) // 100
R.pipe(
  R.assoc('a', 10),
  R.tap(console.log),
  R.assoc('a', 3)
)({a: 1});

// zipWith：将两个数组对应位置的值，一起作为参数传入某个函数。
// apply：将数组转成参数序列，传入指定函数。
// applySpec：返回一个模板函数，该函数会将参数传入模板内的函数执行，然后将执行结果填充到模板。
let getMetrics = R.applySpec({
  sum: R.add,
  nested: { mul: R.multiply }
});

let r7 = getMetrics(2, 4);

// ascend：返回一个升序排列的比较函数，主要用于排序。
// descend：返回一个降序排列的比较函数，主要用于排序。

let isEven = n => n % 2 === 0;
let isOdd = (n) => n % 2 === 1;
let r8 = R.reject(isOdd)([1, 2, 3, 4]) // [2, 4]
let r9 = R.filter(isOdd)([1, 2, 3, 4]);

// reduce是三种运算的合成：
// 	遍历
// 	变形
// 	累积
let arr = [1, 2, 3];
let arr2 = arr.reduce((newArr, x) => {
  newArr.push(x + 1);
  return newArr;
}, []);

console.log(arr2);

// 而transduce就是执行`变形`和`累积`两个运算，让代码具备更高的复用性。

// 变形运算
let plusOne = x => x + 1;

// 累积运算
let append = (newArr, x) => {
  newArr.push(x);
  return newArr;
};

let r10 = R.transduce(R.map(plusOne), append, [], arr);
console.log(r10);

// or
let r11 = R.into([], R.map(R.add(1)), arr);
console.log(r11);

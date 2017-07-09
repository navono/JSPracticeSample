/*
 * @Author: Ping Qixing
 * @Date: 2017-07-03 08:44:15
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-07-08 10:39:11
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

// console.log(arr2);

// 而transduce就是执行`变形`和`累积`两个运算，让代码具备更高的复用性。

// 变形运算
let plusOne = x => x + 1;

// 累积运算
let append = (newArr, x) => {
  newArr.push(x);
  return newArr;
};

let r10 = R.transduce(R.map(plusOne), append, [], arr);
// console.log(r10);

// or
let r11 = R.into([], R.map(R.add(1)), arr);
// console.log(r11);

let basket = [
  {item: 'apples', per: 0.95, count: 3, cost: 2.85, time: 1499231281164},
  {item: 'peaches', per: 0.80, count: 2, cost: 1.60, time: 1499231281264},
  {item: 'plums', per: 0.55, count: 4, cost: 2.20, time: 1499231281364}
];

let add = (a, b) => a + b;
let priceSum = R.reduce(add, 0);
// console.log(R.pluck('cost')(basket));
let totalPrice = R.compose(priceSum, R.pluck('cost'));
totalPrice(basket);

function print (items) {
  R.map(i => {
    console.log(`${i.item} ${i.cost} ${i.time}`);
  })(items);
}

function modify (item) {
  if (item.time instanceof Date) {
    return {...item};
  } else {
    let t = new Date(item.time);
    return {
      ...item,
      time: t
    }
  }
}

R.pipe(
  R.map(modify),
  print
)(basket);

let CARS = [
  {name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false}
];

let debugTrace = R.curry((tag, v) => {
  console.log(tag, v);
  return v;
})

let isLastInStock = R.compose(R.prop('in_stock'), R.last);
// console.log(isLastInStock(CARS));

let nameOfFirstCar = R.compose(R.prop('name'), R.head);
// console.log(nameOfFirstCar(CARS));

let _average = function (xs) { return R.reduce(R.add, 0, xs) / xs.length; };
let averageDollarValue = R.compose(_average, R.pluck('dollar_value'));
// console.log(averageDollarValue(CARS));

let _underscore = R.replace(/\W+/g, '_'); // <-- 无须改动，并在 sanitizeNames 中使用它

let sanitizeNames = R.compose(R.map(_underscore), R.map(R.toLower));
// console.log(sanitizeNames(['Hello World', 'What You Want?']));

let sortByHorsepower = R.sortBy(R.prop('horsepower'));
let fasterCar = R.compose(R.last, sortByHorsepower);
console.log(`${fasterCar(CARS).name} is the fastest`);

const secret = function (msg) {
  return function (r) {
    return console.log(msg + ' ' + r);
  }
}

const mySecret = secret('hi');
mySecret('there');

const secret2 = R.curry((msg, _) => {
  console.log(msg);
});
const mySecret2 = secret2('You!', R._);
console.log(mySecret2());

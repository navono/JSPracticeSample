const R = require('ramda');

// 测试输出
const out = i => console.log(i);

// let sub = R.reduce(R.subtract, 0);
// R.compose(out, sub)([1, 2, 3]);

// 在不增加函数的情况，使用 isEven 查找第一个奇数
// complement 可以对函数返回值取反，接受一个函数 f ，返回一个新函数 g
// const isEven = x => x % 2 === 0;
// let find = R.find(R.complement(isEven));
// R.compose(out, find)([1, 2, 3, 4]);


// const gt10 = x => x > 10;
// const even = x => x % 2 === 0;
// const gt20 = x => x > 20;
// var f = R.either(even, gt20, gt10);
// R.compose(out, f)(17);


const multiply = (a, b) => a * b
const addOne = x => x + 1
const square = x => x * x
 
// const operate = (x, y) => {
//   const product = multiply(x, y)
//   const incremented = addOne(product)
//   const squared = square(incremented)
 
//   return squared
// }

// also like
// cosnt operate = (x, y) => square(addOne(multiply(x, y)));

// from left to right
// const operate = R.pipe(
//   multiply,
//   addOne,
//   square
// )

// from right to left
const operate = R.compose(
  square,
  addOne,
  multiply
);

// 有个用法是，定义函数的时候，使用 pipe，调用函数的时候，使用 compose
 
R.compose(out, operate)(3, 4) ;


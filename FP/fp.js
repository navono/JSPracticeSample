/*
 * @Author: Ping Qixing
 * @Date: 2017-07-06 14:20:04
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-07-10 08:45:01
 * @Description
 * 演示FP的一些例子。在Node下执行
 */

// import R from 'ramda';
let R = require('ramda');

let Container = function (x) {
  this.__value = x;
}

Container.of = function (x) {
  return new Container(x);
}

// (a -> b) -> Container a -> Container b
Container.prototype.map = function (f) {
  return Container.of(f(this.__value));
}

// 现在Container是个functor了。
// functor是实现了 map 函数并遵守一些特定规则的容器类型

// console.log(Container.of(3));

let c = Container.of(2).map(_ => {
  return _ + 2;
})
// console.log(c);

let c2 = Container.of('bombs').map(R.concat(' away')).map(R.prop('length'));
// console.log(c2);

let Maybe = function (x) {
  this.__value = x;
}

Maybe.of = function (x) {
  return new Maybe(x);
}

Maybe.prototype.isNothing = function () {
  return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

let map = R.curry((f, functor) => {
  return functor.map(f);
});
// map(R.prop('age'))(Maybe.of({name: 'Dinah', age: 14}))

Maybe.of({name: 'Boris'}).map(R.prop('age')).map(R.add(10));

Maybe.of({name: 'Dinah', age: 14}).map(R.prop('age')).map(R.add(10));

let IO = function (f) {
  this.__value = f;
}

IO.of = function (x) {
  return new IO(_ => {
    return x;
  })
}

IO.prototype.map = function (f) {
  return new IO(R.compose(f, this.__value));
}

let ioWindow = new IO(_ => window);
ioWindow.map(win => win.innerWidth);

let fs = require('fs');

let readFile = function (filename) {
  return new IO(_ => {
    return fs.readFileSync(filename, 'utf-8');
  });
}

let print = function (x) {
  return new IO(_ => {
    console.log(x);
    return x;
  })
}

let cat = R.compose(R.map(print), readFile);
let catFirstChar = R.compose(R.join, R.map(R.head), cat);

console.log(catFirstChar('./test.txt'));

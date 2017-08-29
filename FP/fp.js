/*
 * @Author: Ping Qixing
 * @Date: 2017-07-06 14:20:04
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-08-22 08:07:23
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

// console.log(catFirstChar('./test.txt'));


let filters = [
  {
    'name': '所有报警',
    'filterKey': '',
    'filterValue': '',
    'icon': 'ContentInbox',
    'subItems': []
  },
  {
    'name': '优先级',
    'filterKey': '',
    'filterValue': '',
    'icon': 'ActionGrade',
    'subItems': [
      {'name': '优先级0', 'filterKey': 'priority', 'filterValue': '0', 'icon': 'ActionGrade', 'subItems': []},
      {'name': '优先级31', 'filterKey': 'priority', 'filterValue': '31', 'icon': 'ActionGrade', 'subItems': []}
    ]
  },
  {
    'name': '设备',
    'filterKey': '',
    'filterValue': '',
    'icon': 'ActionGrade',
    'subItems': [
      {'name': '设备A', 'filterKey': 'device', 'filterValue': 'A', 'icon': 'ActionGrade', 'subItems': []},
      {'name': '设备B', 'filterKey': 'device', 'filterValue': 'B', 'icon': 'ActionGrade', 'subItems': []}
    ]
  }
];

let alarms = [
  {'tagName': 'AA', 'newtime': '2017/6/15 12:00:03', 'acktime': '', 'sleeptime': '', 'almType': 'H', 'tagDesc': 'This is AA description',
    'device': 'B', 'priority': 0, 'acked': true, 'selected': false},
  {'tagName': 'BB', 'newtime': '2017/6/15 12:01:14', 'acktime': '', 'sleeptime': '', 'almType': 'LL', 'tagDesc': 'This is BB description',
    'device': 'A', 'priority': 0, 'acked': false, 'selected': false},
  {'tagName': 'CC', 'newtime': '2017/6/15 12:05:23', 'acktime': '', 'sleeptime': '', 'almType': 'HH', 'tagDesc': 'This is CC description',
    'device': 'B', 'priority': 0, 'acked': false, 'selected': false},
  {'tagName': 'DD', 'newtime': '2017/6/15 12:10:35', 'acktime': '', 'sleeptime': '', 'almType': 'L', 'tagDesc': 'This is DD description',
    'device': 'A', 'priority': 0, 'acked': false, 'selected': false},
  {'tagName': 'EE', 'newtime': '2017/6/15 12:20:03', 'acktime': '', 'sleeptime': '', 'almType': 'HH', 'tagDesc': 'This is EE description',
    'device': 'B', 'priority': 31, 'acked': false, 'selected': false},
  {'tagName': 'FF', 'newtime': '2017/6/15 12:30:45', 'acktime': '', 'sleeptime': '', 'almType': 'LL', 'tagDesc': 'This is FF description',
    'device': 'A', 'priority': 31, 'acked': false, 'selected': false},
  {'tagName': 'GG', 'newtime': '2017/6/15 12:45:00', 'acktime': '', 'sleeptime': '', 'almType': 'H', 'tagDesc': 'This is GG description',
    'device': 'B', 'priority': 31, 'acked': false, 'selected': false},
  {'tagName': 'HH', 'newtime': '2017/6/15 13:03:03', 'acktime': '', 'sleeptime': '', 'almType': 'HH', 'tagDesc': 'This is HH description',
    'device': 'A', 'priority': 31, 'acked': false, 'selected': false},
  {'tagName': 'II', 'newtime': '2017/6/15 13:05:56', 'acktime': '', 'sleeptime': '', 'almType': 'L', 'tagDesc': 'This is II description',
    'device': 'B', 'priority': 31, 'acked': false, 'selected': false}
];
let currentFilter = {
  'filterKey': 'priority',
  'filterValue': 0
};

let filterPair = R.propEq(currentFilter.filterKey, currentFilter.filterValue);
// console.log(R.filter(filterPair, alarms));


const isEven = n => n % 2 === 0;
let f = R.filter(isEven); //=> {b: 2, d: 4}
// R.compose(R.map(console.log), R.pluck('e'))([{a: 1, b: 2, c: 3, d: 4, e: { f: 6}}]);

let m = v => { return {'filterKey': v.filterKey, 'filterValue': v.filterValue}};
// R.compose(R.map(console.log), R.map(m))(filters);

let fp = R.path(['subItems']);
// R.compose(console.log, R.map(fp))(filters);


var gt10 = x => x > 10;
var even = x => x % 2 === 0;
var ef = R.either(gt10, even);
// R.compose(console.log, ef)(101); //=> true
// R.compose(console.log, ef)(8); //=> true


const allList = [{a: 1}, {a: 2}, {a: 3}];
const delList = [{a:1}, {a:3}];

let resultList = R.filter(item => {
  return R.find(R.propEq('a', item.a))(delList) === undefined? true : false;
})(allList);

console.log(resultList);

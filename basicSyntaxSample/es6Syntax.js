/*
 * @Author: Ping Qixing
 * @Date: 2017-06-11 10:46:56
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-08-30 21:25:24
 */

// Arrow function and template string
// 箭头函数有几个使用注意点。
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

let loardify = firstname => `${firstname} of Canterbury`;
// test code
// console.log(loardify('Ping', 'Qixing'));

let tahoe = {
  resorts: ['Kirkwood', 'Squaw', 'Alpine', 'Heavenly', 'Northstar'],

  // because in this case, this means window object
  print: function (delay = 1000) {
    setTimeout(function () {
      console.log(this.resorts.join(','))
    }, delay);
  },

  // use arrow function to protect the scope of this
  print2: function (delay = 1000) {
    setTimeout(() => {
      console.log(this.resorts.join(','))
    }, delay);
  },

  // join not defined.
  // arrow function do not block off the scope of this
  print3: (delay = 1000) => {
    setTimeout(() => {
      console.log(this.resorts.join(','))
    }, delay);
  },

  // verify above assumption
  verifyWithNormaFunc: function (delay = 1000) {
    setTimeout(function () {
      console.log(this === window);   // true
    })
  },

  verifyWithInnerArrowFunc: function (delay = 1000) {
    setTimeout(() => {
      console.log(this === window);   // false
    })
  },

  verifyWithDoubleArrowFunc: (delay = 1000) => {
    setTimeout(() => {
      console.log(this === window);   // true
    })
  }
}
// test code
// tahoe.verifyWithDoubleArrowFunc();

// Destructuring Assignment
let sandwith = {
  bread: 'dutch crunch',
  meat: 'tuna',
  cheese: 'swiss',
  toppings: ['lettuce', 'tomato', 'mustard']
}

let {bread, meat} = sandwith;
// console.log(bread, meat);

bread = 'garlic';
meat = 'turkey';

// console.log(bread);
// console.log(meat);
// console.log(sandwith.bread, sandwith.meat);

// destructure incoming function arguments
let loardify2 = ({firstname}) => {
  console.log(`${firstname} of canterbury`);
}

let regularPerson = {
  firstname: 'Qixing',
  lastname: 'Ping'
}

// loardify2(regularPerson);

// destructure from array
let [, , thirdResort] = ['Kirkwood', 'Squaw', 'Alpine', 'Heavenly', 'Northstar'];
// console.log(thirdResort);

// Object literal enhancement. the opposite of destructuring
let name = 'ping';
let elevation = 9876;
// name and elevation is the keys of the funHike object
let funHike = {name, elevation};
// console.log(funHike);

let print4 = function () {
  console.log(`Mt. ${this.name} is ${this.elevation} feet tall`)
};
let funHike2 = {name, elevation, print4}

// funHike2.print4();

let sound = 'no';
// OLD
// var skier = {
//     name: name,
//     sound: sound,
//     powderYell: function () {
//         var yell = this.sound.toUpperCase()
//         console.log(`${yell} ${yell} ${yell}!!!`)
//     },
//     speed: function (mph) {
//         this.speed = mph
//         console.log('speed:', mph)
//     }
// }

// NEW
// pull global variables into object and reduces typing by
// making the function keyword unnecessary

const skier = {
  name,
  sound,
  powderYell () {
    let yell = this.sound.toUpperCase()
    console.log(`${yell} ${yell} ${yell}!!!`)
  },
  speed (mph) {
    this.speed = mph
    console.log('speed:', mph)
  }
}

// Spread Operator
let peaks = ['Tallac', 'Ralston', 'Rose'];
let canyons = ['Ward', 'Blackwood'];
let tahoe2 = [...peaks, ...canyons];

// console.log(tahoe2.join(', '));

// imagine we wanted to grad the last item
// let [last] = peaks.reverse();   // also reverse the original object, BAD!

let [last] = [...peaks].reverse();  // the peaks array is still intact, GOOD!
// console.log(last);
// console.log(peaks);

// use spread operator to operat array
let lakes = ['Donner', 'Marlette', 'Fallen Leaf', 'Cascade'];
let [first, ...rest] = lakes;
// console.log(rest.join(', '));

// use spread operator for function args
function directions (...args) {
  let [start, ...remainin] = args;
  let [finish, ...stops] = remainin.reverse();

  console.log(`drive through ${args.length} towns`)
  console.log(`start in ${start}`)
  console.log(`the destination is ${finish}`)
  console.log(`stopping ${stops.length} times in between`)
}

// directions(
//     'Truckee',
//     'Tahoe City',
//     'Sunnyside',
//     'Homewood',
//     'Tahoma'
// )

let morning = {
  breakfast: 'oatmeal',
  lunch: 'peanut butter and jelly'
}
let dinner = 'mac and cheese';

let backpackingMeals = {
  // ...morning,      // ES2017
  dinner
}

// console.log(backpackingMeals);

// Promises
var promise = new Promise(function (resolve, reject) {
  // do a thing, possibly async, then…
  let a = 2;
  if (a !== 1) {
    resolve('Stuff worked!');
  } else {
    reject(Error('It broke'));
  }
});

// promise.then(
//     value => {
//         console.log(value);
//     }, err => {
//     console.log(err);
// }).catch(err => {
//     console.log(err);
// })

const getFakeMembers = count => new Promise((resolve, reject) => {
  const api = `http://api.randomuser.me/?nat=US&results=${count}`;
  const request = new XMLHttpRequest();
  request.open('GET', api);
  request.onload = () =>
    (request.status === 200)
      ? resolve(JSON.parse(request.response).results)
      : reject(Error(request.statusText));

  request.onerror = (err) => reject(err);
  request.send();
})

// getFakeMembers(10).then(
//     members => console.log(members),
//     err => console.log(new Error(err))
// );

// Class
class Vacation {
  constructor (destination, length) {
    this.destination = destination;
    this.length = length;
  }

  print () {
    console.log(`${this.destination} will take ${this.length} days.`);
  }
}

// const trip = new Vacation('Santiago, Chile', 7);
// trip.print();

class Expedition extends Vacation {
  constructor (destination, length, gear) {
    super(destination, length);
    this.gear = gear;
  }

  print () {
    super.print();
    console.log(`bring yours ${this.gear.join(' and your ')}`);
  }
}

const trip = new Expedition('Mt. Whitney', 3, ['sunglasses', 'prayer flags', 'camera']);
// trip.print();
// console.log(Vacation.prototype);

// immutable
let colorLawn = {
  title: 'lawn',
  color: '#0F0',
  rating: 0
}
let rateColor = function (color, rating) {
  return Object.assign({}, color, {rating: rating});
  // 类似的还有Array.concat()
  // 和 [...list, {xxx}]
}

// ES7
// let rateColor2 = (color, rating) => ({
//     ...color,
//     rating
// })

// console.log(rateColor(colorLawn, 4).rating);
// console.log(colorLawn.rating);

let frederick = {
  name: 'Frederick Douglass',
  canRead: false,
  canWrite: false
}

// impure
function selfEducate () {
  frederick.canRead = true
  frederick.canWrite = true
  return frederick
}
// selfEducate()
// console.log(frederick);

const pureSelfEducate = person => {
  return Object.assign({}, person, {canRead: true, canWrite: true});
}
// ES7
// const pureSelfEducate = person => ({
//     ...person,
//     canRead: true,
//     canWrite: true
// })

// console.log(pureSelfEducate(frederick));
// console.log(frederick);

function throwIfMissing () {
  throw new Error('Missing parameter');
}

function foo (mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

// foo();

// pipeline
const pipeline = (...funcs) =>
  val => funcs.reduce((a, b) => b(a), val);

const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1, mult2);

// addThenMult(5)

// equal
// mult2(plus1(5))

// 绑定this
// let log = ::console.log;
let log = console.log.bind(console);

// 非尾递归
function Fibonacci (n) {
  if (n <= 1) { return 1 }

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}

// Fibonacci(10) // 89
// Fibonacci(100) // 堆栈溢出
// Fibonacci(500) // 堆栈溢出

// 尾递归
function Fibonacci2 (n, ac1 = 1, ac2 = 1) {
  if (n <= 1) { return ac2 }

  return Fibonacci2(n - 1, ac2, ac1 + ac2);
}

// Fibonacci2(100) // 573147844013817200000
// Fibonacci2(1000) // 7.0330367711422765e+208
// Fibonacci2(10000) // Infinity

function factorial (n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

// factorial(5) // 120

function factorialTail (n, total) {
  if (n === 1) return total;
  return factorialTail(n - 1, n * total);
}

// factorial(5, 1) // 120

// 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。
// 做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。

// 比如上面的例子，阶乘函数 factorial 需要用到一个中间变量total，那就把这个中间变量改写成函数的参数。
// 这样做的缺点就是不太直观，第一眼很难看出来，为什么计算5的阶乘，需要传入两个参数5和1？

// 两个方法可以解决这个问题。方法一是在尾递归函数之外，再提供一个正常形式的函数。
function tailFactorial (n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial2 (n) {
  return tailFactorial(n, 1);
}

// 函数式编程有一个概念，叫做柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。
function currying (fn, n) {
  return function (m) {
    return fn.call(this, m, n);
  };
}

function tailFactorial2 (n, total) {
  if (n === 1) return total;
  return tailFactorial2(n - 1, n * total);
}

const factorial3 = currying(tailFactorial2, 1);

// factorial3(5) // 120

// 第二种方法就简单多了，就是采用 ES6 的函数默认值。
function factorial4 (n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

// factorial4(5) // 120

// ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。
// 尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？
// 回答是可以的，就是自己实现尾递归优化。

// 它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。
// 怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

// 正常递归版
function sum (x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1);
  } else {
    return x;
  }
}

// 蹦床版
function trampoline (f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

function sum2 (x, y) {
  if (y > 0) {
    return sum2.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}
// trampoline(sum2(1, 100000))
// 100001

// 蹦床函数并不是真正的尾递归优化，下面的实现才是。
function tco (f) {
  let value;
  let active = false;
  let accumulated = [];

  return function accumulator () {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

// tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。
// 然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；而accumulated数组存放每一轮sum执行的参数，总是有值的，
// 这就保证了accumulator函数内部的while循环总是会执行。这样就很巧妙地将“递归”改成了“循环”，
// 而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层

var sum3 = tco(function (x, y) {
  if (y > 0) {
    return sum3(x + 1, y - 1)
  } else {
    return x
  }
});

// sum3(1, 3);

// Proxy
let obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});

obj.count = 1;
++obj.count;

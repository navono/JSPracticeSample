// Default Parameters Values

// ES5
function makeRequestV5(url, timeout, callback) {
  timeout = timeout || 2000;
  callback = callback || function() {};

  // the rest of the function
}

// ES6
function makeRequestV6(url, timeout = 2000, callback = () => {}) {
  // the rest of the function
}

// The arguments object in a function using ECMAScript 6 default parameter
// values will always behave in the same manner as ECMAScript 5 strict
// mode regardless of whether the function is explicitly running in strict mode
function minxArgs(first, second = 'b') {
  console.log(arguments.length);
  console.log(first === arguments[0]);
  console.log(second === arguments[1]);

  first = 'c';
  second = 'd';
  console.log(first === arguments[0]);
  console.log(second === arguments[1]);
}

// minxArgs('a');

// Default Parameter Expressions
const getValue = _ => {
  return 5;
};

const add = (first, second = getValue()) => {
  return first + second;
};

// console.log(add(1, 1));

// 函数传的是引用，而不是函数调用的结果
// console.log(add(1));

// TDZ（Temporary Dead Zone）
const add2 = (first = second, second) => {
  return first + second;
};

// console.log(add2(undefined, 1));  // NaN

function Person(name) {
  // if (this instanceof Person) {
  //   this.name = name;
  // } else {
  //   throw new Error('must use new');
  // }

  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('must use new');
  }
}

const person = new Person('Ping');
// const notAPerson = Person('Ping');

// console.log(person);
// console.log(notAPerson);

// Block-level Functions
if (true) {
  console.log(typeof doSomething);

  function doSomething() {
    console.log('doSomething');
  }

  doSomething();
}

console.log(typeof doSomething); // undefined

// Arrow Functions
// - No this, super, arguments, and new.target bindings
// - Cannot be called with new
// - No prototype
// - Can't change this
// - No arguments object
// - No duplicate named parameters

// 如果箭头函数被包含在非箭头函数内，那么会有 this,
// 和非箭头函数内一样
let PageHandler = {
  id: '123',
  init: function() {
    document.addEventListener(
      'click',
      event => this.doSomething(event.type),
      false
    );
  },

  doSomething: function(type) {
    console.log(`Handling ${type} for ${this.id}`);
  }
};

PageHandler.init();

const sum = (num1, num2) => num1 + num2;
console.log(sum.call(null, 1, 2));
console.log(sum.apply(null, [1, 2]));

const boundSum = sum.bind(null, 1, 2);
console.log(boundSum());

// Tail Call Optomization
// • The tail call does not require access to variables in the current stack
//    frame (meaning the function is not a closure).
// • The function making the tail call has no further work to do after the
//    tail call returns.
// • The result of the tail call is returned as the function value.

// 返回值必须是函数（不能是闭包），且在语句最后；

// 非TCO版本
function factorial(n) {
  if (n <= 1) {
    return 1;
  } else {
    // not optimized - must multiply after returning
    return n * factorial(n - 1);
  }
}

// 理论上的TCO版本
function factorial2(n, p = 1) {
  if (n <= 1) {
    return 1 * p;
  } else {
    let result = n * p;

    return factorial2(n - 1, result);
  }
}

// 实际上，在Chrome60上并没有优化
// console.log(factorial_TCO(10));

// 这才是真正的TCO优化
function tco(f) {
  let value;
  let active = false;
  let accumulated = [];

  return function accumulator() {
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

const factorial_TCO = tco((n, p = 1) => {
  if (n <= 1) {
    return 1 * p;
  } else {
    let result = n * p;

    // optimized
    return factorial_TCO(n - 1, result);
  }
});

console.log(factorial_TCO(10));

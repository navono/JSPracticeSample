// Default Parameters Values

// ES5
function makeRequestV5(url, timeout, callback) {
  timeout = timeout || 2000;
  callback = callback || function () {};

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
}

const add = (first, second = getValue()) => {
  return first + second;
}

// console.log(add(1, 1));

// 函数传的是引用，而不是函数调用的结果
// console.log(add(1));

// TDZ（Temporary Dead Zone）
const add2 = (first = second, second) => {
  return first + second;
}

// console.log(add2(undefined, 1));  // NaN
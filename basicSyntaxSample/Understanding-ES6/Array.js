//**************************************************************************** */
// ES6之前
let items = new Array(2);
console.log(items.length); // 2
console.log(items[0]); // undefined
console.log(items[1]); // undefined

items = new Array("2");
console.log(items.length); // 1
console.log(items[0]); // "2"

items = new Array(1, 2);
console.log(items.length); // 2
console.log(items[0]); // 1
console.log(items[1]); // 2

items = new Array(3, "2");
console.log(items.length); // 2
console.log(items[0]); // 3
console.log(items[1]); // "2"

// ES6
let items2 = Array.of(1, 2);
console.log(items2.length); // 2
console.log(items2[0]); // 1
console.log(items2[1]); // 2

items2 = Array.of(2);
console.log(items2.length); // 1
console.log(items2[0]); // 2

items2 = Array.of("2");
console.log(items2.length); // 1
console.log(items2[0]); // "2"

//**************************************************************************** */
function doSomething() {
  let args = Array.from(arguments);
  console.log(args);
}

function translate() {
  let args = Array.from(arguments, value => value + 1);
  console.log(args);
}

let helper = {
  diff: 1,
  add(value) {
    return value + this.diff;
  }
};

function translate2() {
  let args = Array.from(arguments, helper.add, helper);
  console.log(args);
}

doSomething(1, 2);
translate(1, 2);
translate2(1, 2);

let numbers = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};

let numbers2 = Array.from(numbers, value => value + 1);
console.log(numbers2); // 2,3,4

let numbers3 = [1, 2, 3, 4];
// 第一个参数是值，第二个是开始索引，第三个是结束索引（不包含），
numbers3.fill(1, 2);
console.log(numbers3.toString()); // 1,2,1,1

numbers3.fill(0, 1, 3);
console.log(numbers3.toString()); // 1,0,0,1

numbers3.copyWithin(2, 0, 1);
console.log(numbers3.toString());

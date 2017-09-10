//**************************************************************************** */
// Iterator
// 迭代器只是带有特殊接口的对象。所有迭代器对象都带有 next() 方法并返回一个包含两个属性的结果对象。
// 这些属性分别是 value 和 done，前者代表下一个位置的值，后者在没有更多值可供迭代的时候为 true 。
// 迭代器带有一个内部指针，来指向集合中某个值的位置。当 next() 方法调用后，指针下一位置的值会被返回

function createIterator(items) {
  let i = 0;
  return {
    next: function() {
      let done = i >= items.length;
      let value = !done ? items[i++] : undefined;

      return {
        done,
        value
      };
    }
  };
}

let iterator = createIterator([1, 2, 3]);
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

//**************************************************************************** */
// Generator
// 返回迭代器的函数。生成器函数由 function 关键字和之后的星号（*）标识，同时还能使用新的 yield 关键字。
// 星号的位置不能论是放在 function 关键字的后面还是在它们之间插入空格都是随意的。

function* createGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

let iterator2 = createGenerator();
// console.log(iterator2.next().value);
// console.log(iterator2.next().value);
// console.log(iterator2.next().value);
// console.log(iterator2.next().value);

//**************************************************************************** */
// Generator函数表达式
// 无法使用箭头函数来创建生成器。

let createGenerator2 = function*(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
};

//**************************************************************************** */
// 可迭代类型与 for-of
// 可迭代类型是指那些包含 Symbol.iterator 属性的对象

let values = [1, 2, 3];
for (let num of values)       {
  console.log(num);
}
// 0, 1, 2

// 访问默认迭代器
// let iter = values[Symbol.iterator]();

// console.log(iter.next());

function isIterable(object) {
  return typeof object[Symbol.iterator] === 'function';
}

//**************************************************************************** */
// 创建可迭代类型
let collection = {
  items: [],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
};

collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let x of collection) {
  console.log(x);
}

//**************************************************************************** */
// 生成器代理

function* createNumberIterator() {
  yield 1;
  yield 2;
}

function* createColorIterator() {
  yield 'red';
  yield 'green';
}

function* createCombinedIterator() {
  yield* createNumberIterator();
  yield* createColorIterator();
  yield true;
}

const iterator3 = createCombinedIterator();
console.log(iterator3.next()); // "{ value: 1, done: false }"
console.log(iterator3.next()); // "{ value: 2, done: false }"
console.log(iterator3.next()); // "{ value: "red", done: false }"

//**************************************************************************** */
// 运行异步任务

function run(taskDef) {
  // 创建迭代器，使它们可以在别处使用
  let task = taskDef();

  // 任务开始执行
  let result = task.next();

  // 递归函数持续调用 next()
  function step() {
    if (!result.done) {
      // result = task.next();
      // result = task.next(result.value);

      if (typeof result.value === 'function') {
        result.value((err, data) => {
          if (err) {
            result = task.throw(err);
            return;
          }

          result = task.next(data);
          step();
        });
      } else {
        result = task.next(result.value);
        step();
      }
    }
  }

  // 开始递归
  step();
}

// 例子
run(function*() {
  console.log('start mission');
  yield;
  console.log('kill the boss');
  yield;
  console.log('mission completed');
  yield;
});

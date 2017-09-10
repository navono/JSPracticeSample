//**************************************************************************** */
// Object.is()
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false

console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

//**************************************************************************** */
// Object.assign()
let receiver = {};
Object.assign(
	receiver,
	{
		type: 'js',
		name: 'file.js'
	},
	// 会覆盖前面的
	{
		type: 'css'
	}
);

// console.log(receiver.type);
// console.log(receiver.name);

// 当 supplier 有访问器属性（accessor properties）时，Object.assign不会在 receiver 创建
// 访问器属性
let receiver2 = {},
	supplier = {
		get name() {
			return 'file.js';
		}
	};
Object.assign(receiver2, supplier);
const descriptor = Object.getOwnPropertyDescriptor(receiver2, 'name');

console.log(descriptor.value); // file.js
console.log(descriptor.get); // undefined

//**************************************************************************** */
// 复制对象字面量属性
let author = {
	name: 'ping',
	name: 'Qixing'
};

console.log(author.name);

//**************************************************************************** */
// 自有属性枚举顺序：
// 所有数值键升序
// 所有字符串键以加入到对象的顺序为序
// 所有的Symbol键以加入到对象的顺序为序

const objPropEnum = {
	a: 1,
	0: 1,
	c: 1,
	2: 1,
	b: 1,
	1: 1
};

objPropEnum.d = 1;
console.log(Object.getOwnPropertyNames(objPropEnum).join('-')); // 0-1-2-a-c-b-d

//**************************************************************************** */
// prototype 的加强
// 1. 改变对象的 prototype

let person = {
	getGreeting() {
		return 'Hello';
	}
};

let dog = {
	getGreeting() {
		return 'Woof';
	}
};

let friend = Object.create(person);
// console.log(friend.getGreeting());                      // 'Hello'
// console.log(Object.getPrototypeOf(friend) === person);  // true

// set prototype to dog
Object.setPrototypeOf(friend, dog);
// console.log(friend.getGreeting());                      // 'Woof'
// console.log(Object.getPrototypeOf(friend) === dog);     // true

// 使用 super 引用访问 prototype

let friend2 = {
	getGreeting() {
		// return Object.getPrototypeOf(this).getGreeting.call(this) + ', hi!';

		// super 只是一个指向当前对象的 prototype 的指针，也就是Object.getPrototypeOf(this) 的值。
		// 在简明方法外使用 super 都会导致语法错误，见 getGreeting2
		return super.getGreeting() + ', hi!';
	}

	// 命名属性，因此不能访问 super
	// getGreeting2: function () {
	//   return super.getGreeting() + ', hi!';
	// }
};

Object.setPrototypeOf(friend2, person);
// console.log(friend2.getGreeting());                      // 'Hello, hi!'
// console.log(Object.getPrototypeOf(friend2) === person);  // true

Object.setPrototypeOf(friend2, dog);
// console.log(friend2.getGreeting());                      // 'Woof, hi!'
// console.log(Object.getPrototypeOf(friend2) === dog);     // true

// 在一些场合下， Object.getPrototypeOf并不适用
let animal = {
	name() {
		return "I'm animal";
	}
};

let cat = {
	name() {
		// relative 的 prototype 是cat，调用cat的下面方法后会造成递归
		// return Object.getPrototypeOf(this).name.call(this) + ', hi!';

		// 而 super 可以解决此问题。因为 super 不是动态的。这里的 super 只会指向
		// animal
		return super.name() + ', hi!';
	}
};
Object.setPrototypeOf(cat, animal);

// prototype is cat
let relative = Object.create(cat);

console.log(animal.name());
console.log(cat.name());
console.log(relative.name()); // error

//**************************************************************************** */
// 正式的方法定义
// 简单阐述下方法和函数的区别：方法属于对象，而函数则没有所属关系

// ES6之前，方法没有正式的定义，只是一个包含了函数而不是数据的对象属性
// ES6正式定义了方法，是一个内部包含了[[HomeObject]]属性的函数

let person2 = {
	// method
	getGreeting() {
		return 'Hello';
	}
};

// not a method
function shareGreeting() {
	return 'Hi!';
}

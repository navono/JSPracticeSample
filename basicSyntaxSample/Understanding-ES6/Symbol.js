//**************************************************************************** */
// 创建 Symbol

// let firstName = Symbol();
// let firstName = Symbol('first name');
// let person = {};

// person[firstName] = 'Ping';
// console.log(person[firstName]);

// console.log(firstName);
// console.log(typeof firstName);

//**************************************************************************** */
// 使用 Symbol

let firstName = Symbol('first name');

// 使用动态计算的属性名
let person = {
	[firstName]: 'Ping'
};

// symbol类型的动态属性不可枚举

// 修改为只读属性
Object.defineProperty(person, firstName, { writable: false });

let lastName = Symbol('last name');

Object.defineProperties(person, {
	[lastName]: {
		value: 'Qixing',
		writable: false
	}
});

console.log(person[firstName]);
console.log(person[lastName]);

//**************************************************************************** */
// 共享 Symbol
// 创建共享 symbol 时，要用 Symbol.for()

let uid = Symbol.for('uid');
let object = {
	[uid]: '1234'
};

let uid2 = Symbol.for('uid');

console.log(uid === uid2);
console.log(object[uid2]);

let uid3 = Symbol('uid');

console.log(Symbol.keyFor(uid)); // uid
console.log(Symbol.keyFor(uid2)); // uid
console.log(Symbol.keyFor(uid3)); // undefined

//**************************************************************************** */
// Symbol 强制转换
let desc = String(uid);
console.log(desc);

//**************************************************************************** */
// 提取 Symbol 属性

let symbols = Object.getOwnPropertySymbols(object);

console.log(symbols.length);

//**************************************************************************** */
// Well-Known Symbol 属性

let collection = {
	0: 'Hello',
	1: 'world',
	length: 2,
	[Symbol.isConcatSpreadable]: true
};

let msg = ['hi'].concat(collection);

console.log(msg);

// 将对象隐式的转换为基本类型值
function Temperature(degrees) {
	this.degrees = degrees;
}

Temperature.prototype[Symbol.toPrimitive] = function(hint) {
	switch (hint) {
		case 'string':
			return this.degrees + '\u00b0';

		case 'number':
			return this.degrees;

		case 'default':
			return this.degrees + ' degrees';
	}
};

let freezing = new Temperature(32);

console.log(freezing + '!');
console.log(freezing / 2);
console.log(String(freezing));

// Symbol.toStringTag

function Person(name) {
	this.name = name;
}

// Person.prototype[Symbol.toStringTag] = 'Person';
Person.prototype[Symbol.toStringTag] = 'Array';

Person.prototype.toString = function() {
	return this.name;
};

let me = new Person('Ping');

console.log(me.toString());
console.log(Object.prototype.toString.call(me));

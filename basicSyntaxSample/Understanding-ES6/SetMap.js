//**************************************************************************** */
// ES6之前
let set = Object.create(null);
set.foo = true;

// 检查属性是否存在
if (set.foo) {
	console.log('set.foo exist');
}

let map = Object.create(null);
map.foo = 'bar';

console.log(map.foo); // bar

// 问题
let key1 = {},
	key2 = {};
map[key1] = 'foo';

console.log(map[key2]);

//**************************************************************************** */
// ES6
let set2 = new Set();

set2.add(key1);
set2.add(key2);
set2.add(5);
set2.add('5');

console.log(set2.size); // 2

let set3 = new Set([1, 2]);
set3.forEach(function(value, key, ownerSet) {
	console.log(key + ' ' + value);
	console.log(ownerSet === set3);
});

let processor = {
	output(value) {
		console.log(value);
	},
	process(dataSet) {
		// dataSet.forEach(function(value) {
		//   this.output(value);
		// }, this);

		dataSet.forEach(value => this.output(value));
	}
};

processor.process(set3);

// 转换为数组
let array = [...set3];
console.log(array);

// 消除重复
function eliminateDuplicates(items) {
	return [...new Set(items)];
}

let numbers = [3, 3, 3, 4, 5, 1, 2],
	noDuplicates = eliminateDuplicates(numbers);

console.log(noDuplicates); // [1,2,3,4,5]

// Set 类型根据它存储对象的方式，也被称为 strong set
// 只要对该 Set 实例的引用存在，那么存储的对象在垃圾回收以释放内存的时候无法被销毁

// weak set 和 一般 set 的最大区别是前者存储的是弱对象引用
// 它们有一些关键的差异，例如：
// 当调用 add()，has() 或 delete() 方法传入了一个非对象参数时，一个错误会被抛出。
// weak set 不是可迭代类型，因此不能被用在 for-of 循环中。
// weak set 无法暴露出自身的迭代器（例如 keys() 和 values() 方法），所以没有任何编程手段来确定 weak set 中的内容
// weak set 没有 forEach() 方法。
// weak set 没有 size 属性。

//**************************************************************************** */

let map2 = new Map([['name', 'Nicholas'], ['age', 25]]);

console.log(map2.has('name')); // true
console.log(map2.get('name')); // "Nicholas"
console.log(map2.has('age')); // true
console.log(map2.get('age')); // 25
console.log(map2.size); // 2

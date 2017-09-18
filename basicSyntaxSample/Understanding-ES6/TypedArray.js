//**************************************************************************** */
// ArrayBuffer: 8bit
let buffer = new ArrayBuffer(10);
console.log(buffer.byteLength);

let buffer2 = buffer.slice(4, 6);
console.log(buffer2.byteLength);

// ArrayBuffer 只是代表内存地址。DataView才能操作 ArrayBuffer
let view = new DataView(buffer);
view.setInt8(0, 5);
console.log(view.getInt8(0));

//**************************************************************************** */
// Typed Array:
// Int8Array
// Uint8Array
// ...

// BYTES_PER_ELEMENT 可以显示每个类型的一个元素占多少字节
console.log(Int8Array.BYTES_PER_ELEMENT);

// TypedArray 和普通数组的区别在于：
// 1. TypedArray的length不能改变，也就是不能随便改变大小
// 2. TypedArray的方法会检查类型
// 3. TypedArray不是普通数组。Array.isArray(TypedArray) == false
// 4. TypedArray会确保数组中的数据类型的正确性。let ints = new Int16Array(['hi'])
// 5. TypedArray没有普通数组中的以下方法：
//    concat shift pop push splice unshift
// 6. TypedArray额外有以下方法：
//    set subarray

let ints = new Int16Array([25, 50]),
  mapped = ints.map(v => v * 2);

console.log(mapped.length);
console.log(mapped[0]);
console.log(mapped[1]);

console.log(mapped instanceof Int16Array); // true
console.log(mapped instanceof Array); // false

// 转换成普通数组
let intsArray = [...ints];
console.log(intsArray instanceof Array); // true

// 同样也有 of() 和 from()
let int16s = Int16Array.of(25, 50),
  floats = Float32Array.from([1.5, 2.5]);

console.log(int16s instanceof Int16Array); // true
console.log(floats instanceof Float32Array); // true

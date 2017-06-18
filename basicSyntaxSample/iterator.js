/*
 * @Author: Ping Qixing
 * @Date: 2017-06-18 08:54:33
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-18 10:49:43
 * @Description
 */

function Obj (value) {
    this.value = value;
    this.next = null;
}

Obj.prototype[Symbol.iterator] = function () {
    let iterator = {
        next: next
    };

    let current = this;
    function next () {
        if (current) {
            let value = current.value;
            current = current.next;
            return {
                done: false,
                next: value
            };
        } else {
            return {
                done: true
            };
        }
    }

    return iterator;
}

let one = new Obj(1);
let two = new Obj(2);
let three = new Obj(3);

one.next = two;
two.next = three;

for (let i of one) {
    console.log(i);
}

let obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator] () {
        const self = this;
        let index = 0;
        return {
            next () {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};

for (let o of obj) {
    console.log('obj item: ' + o);
}

let bzz = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};

for (let item of bzz) {
    console.log(item);
}

// 使用Generator实现iterator接口
let objGenerator = {
    * [Symbol.iterator] () {
        yield 'hello';
        yield 'world';
    }
};

// 一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以用for...of循环遍历它的成员。
// 也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。

// for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、
// 后文的 Generator 对象，以及字符串。

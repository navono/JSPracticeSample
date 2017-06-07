/*
 * @Author: Ping Qixing
 * @Date: 2017-06-07 08:47:30
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-07 08:49:56
 */

// IIFE(Immediately-Invoked Function Expression)
let module1 = (function () {
    let _count = 0;
    let method1 = function () {
        console.log('method1');
    }

    let mothod2 = function () {
        console.log('method2');
    }
})();

// 无法读取内部变量
console.log(module1._count);

/*
 * @Author: Ping Qixing
 * @Date: 2017-06-04 15:39:08
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-07 08:52:44
 */

'use strict';

// Module export
let MODULE = (function () {
    let my = {};
    let privateVar = 1;

    function privateMethod () {
        console.log('privateMethod');
        console.log('internal var: ' + privateVar);
    }

    my.moduleProperty = 1;
    my.moduleMethod = function () {
        privateMethod();
    };

    return my;
}());

// console.log(MODULE.privateVar);
// MODULE.privateMethod();

console.log(MODULE.moduleProperty);
MODULE.moduleMethod();

// 放大模式(augmentation)
// 在传入的模块基础上，增加额外的属性或者方法
var MODULE2 = (function (mod) {
    mod.anotherMethod = function () {
        console.log('another method');
    };

    return mod;
}(MODULE));

MODULE2.anotherMethod();

// 宽放大模式(Loose augmentation)
// 防止加载空对象
let MODULE3 = (function (mod) {
    mod.thirdMethod = function () {
        console.log('third method');
    };

    return mod;
}(MODULE || {}));

MODULE3.thirdMethod();

// 紧放大模式
let MODULE4 = (function (mod) {
    let oldModuleMethod = mod.moduleMethod;

    mod.moduleMethod = function () {
        // method override, has access to old through old_moduleMethod
        console.log('oevrride moduleMethod');
        console.log('call old moduleMethod:');
        oldModuleMethod();
    };

    return mod;
}(MODULE));

MODULE4.moduleMethod();

// 跨文件私有变量
// 所有文件可以在它们各自的_private变量上设置属性，并且它理解可以被其他文件访问。
// 一旦这个模块加载完成，应用程序可以调用MODULE._seal()来防止外部对内部_private的调用。
// 如果这个模块需要被重新放大，在任何一个文件中的内部方法可以在加载新的文件前调用_unseal()，
// 并在新文件执行好以后再次调用_seal()。
var MODULE5 = (function (my) {
    let _private = my._private = my._private || {};
    let _seal = my._seal = my._seal || function () {
        delete my._private;
        delete my._seal;
        delete my._unseal;
    };
    let _unseal = my._unseal = my._unseal || function () {
        my._private = _private;
        my._seal = _seal;
        my._unseal = _unseal;
    };

    // permanent access to _private, _seal, and _unseal

    return my;
}(MODULE || {}));

MODULE5._private = 5;

// 子模块
MODULE.sub = (function () {
    var my = {};
    // ...

    return my;
}());

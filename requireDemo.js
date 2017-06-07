/*
 * @Author: Ping Qixing
 * @Date: 2017-06-07 10:06:41
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-07 10:24:02
 */

// Normal
// (function () {
//     function func1 () {
//         alert('it works');
//     }

//     func1();
// })();

// Template
// define([
//     'require',
//     'dependency'
// ], function(require, factory) {
//     'use strict';
// });

// requiresjs定义了三个变量：define，require，requirejs
//  其中require === requirejs

// define用来定义个模块
// require用来加载依赖模块，在页面中使用
define(function () {
    'use strict';
    function func1 () {
        alert('it works');
    }

    func1();
})

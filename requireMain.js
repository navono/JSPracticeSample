/*
 * @Author: Ping Qixing
 * @Date: 2017-06-07 10:36:17
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-07 13:31:54
 */
require.config({
    baseUrl: '.',
    paths: {
        // 'jquery': ['http://libs.baidu.com/jquery/2.0.3/jquery'],
        'demo': './requireDemo'
    }
    // 非AMD模块，导出多个变量
    // , shim: {
    //     hello: {
    //         init: function () {
    //             return {
    //                 hello: hello,
    //                 hello2: hello2
    //             }
    //         }
    //     },
    //     world: {
    //             exports: 'world'
    //     }
    // }
})

require(['demo'], function (demo) {
    demo.hello();
    alert('load finished');
})

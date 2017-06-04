/*
 * @Author: Ping Qixing
 * @Date: 2017-06-04 15:35:06
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-04 15:40:41
 */
'use strict';

// 获取和设置原始类型的属性会隐式地创建封装对象。每次都会创建一个新的封装对象，所以设置的值不会保留。
'hello'.someProperty = 19;
console.log('hello'.someProperty);

/*
 * @Author: Ping Qixing
 * @Date: 2017-06-04 15:35:06
 * @Last Modified by: Ping Qixing
 * @Last Modified time: 2017-06-04 15:44:11
 */
'use strict';

// https://github.com/cedrusweng/bookReader/tree/master/%E7%BC%96%E5%86%99%E9%AB%98%E8%B4%A8%E9%87%8FJavaScript%E4%BB%A3%E7%A0%81%E7%9A%8468%E4%B8%AA%E6%9C%89%E6%95%88%E6%96%B9%E6%B3%95
// http://www.cnblogs.com/wengxuesong/p/5752751.html

// 当做相等比较时，原始类型的封装对象与其原始值行为不一样。
// 原始值一定等于原始值，封装对象不等于相同的值的封装对象。“mm”==”mm” ;   new String(“mm”) != new String(“mm”)

// 获取和设置原始类型的属性会隐式地创建封装对象。每次都会创建一个新的封装对象，所以设置的值不会保留。
'hello'.someProperty = 19;
console.log('hello'.someProperty);

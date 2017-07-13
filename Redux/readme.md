Redux就重要的概念是：使用一个全局的 store 来管理所有的 state ，从而形成一个 state tree，也就是三原理中的：
- 单源原理


***
应用程序的 state 应该存放在单一的不可变的对象中。需要修改的话，只能是一整个全部替换。在Redux中，Action 就是来执行 state 更新。

当我们对某项进行修改时，这个 action 应该有一个负载数据，用来反映此次的修改，比如：
```js
{
  type: "RATE_COLOR",
  id: "a5685c39-6bdc-4727-9188-6c9a00bf7f95",
  rating: 4
}
```
或者在新增时，包含新增所需的所有信息：
```js
{
  type: "ADD_COLOR",
  color: "#FFFFFF",
  title: "Bright White",
  rating: 0,
  id: "b5685c39-3bdc-4727-9188-6c9a33df7f52",
  timestamp: "Sat Mar 12 2016 16:12:09 GMT-0800 (PST)"
}
```

在此示例中， state 树分为两类：“[colors]”和“sort”

***
用来执行 action 的函数，称之为 reducer。接收一个 state 和一个 action ，返回一个新的 state 。
在此示例中， reducer 树分为两类：操作类和排序类。
操作类包括ADD，RATE等
排序类则是SORT。
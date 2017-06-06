// 原型链继承。缺点：引用类型的属性被所有实例共享
function Parent () {
    this.name = 'Ping';
}

Parent.prototype.getName = function () {
    console.log('Parent.prototype.getName(): ' + this.name);
}

function Child () {

}

Child.prototype = new Parent();
var child = new Child();
child.getName();

// 借用构造函数（经典继承）。缺点：每次创建实例都会创建一遍方法
function Parent2 () {
    this.names = ['Ping', 'Sun'];
}

function Child2 () {
    Parent2.call(this);
}

let child2 = new Child2();
child2.names.push('Yeah');
console.log(child2.names);

let child22 = new Child2();
console.log(child22.names);

// 组合继承。
function Parent3 (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent3.prototype.getName = function () {
    console.log(this.name);
}

function Child3 (name, age) {
    Parent3.call(this, name);
    this.age = age;
}
Child3.prototype = new Parent3();

let child3 = new Child3('Ping', 28);
child3.colors.push('black');
console.log(child3.name);
console.log(child3.age);
console.log(child3.colors);

let child33 = new Child3('L', 28);
console.log(child33.name);
console.log(child33.age);
console.log(child33.colors);

// 寄生组合式继承
function object (o) {
    function F () {}
    F.prototype = o;
    return new F();
}

function prototype (child, Parent) {
    let prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

function Parent4 (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent4.prototype.getName = function () {
    console.log(this.name);
}

function Child4 (name, age) {
    Parent4.call(this, name);
    this.age = age;
}

// let F = function () {};
// F.prototype = Parent4.prototype;
// Child4.prototype = new F();

prototype(Child4, Parent4);


关于es6，还有js基础，前端的面试基础知识整理


<br>

| js | html | css | es6 | 计算机网络 | other |
| :-----------: | :---------: | :---------: | :---------: | :---------: | :---------: |
| [:star:](#pencil2-算法) | [:shaved_ice:](#computer-操作系统) | [:sunny:](#computer-操作系统) | [:es:](#book-es6) |[:house:](#computer-计算机网络) | [:wavy_dash:]() |

<br>

# :book: es6
- let const
- 模板字符串
- 默认参数
- [解构赋值]()
- promise


# :book: js

# :pencil2: js

```js
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayHello = function(){
    console.log(this.name + "say hello");
}

console.log("通过constructor 分辨原型对象到底是哪个构造函数");
function Person2(name,age){
    this.name1 = name;
    this.age1 = age;
}
Person2.prototype.sayHello1 = function(){
    console.log(this.name + "say hello");
}
const girl = new Person2("p1", 1);
const boy = new Person2("p2", 12);
console.log(boy.constructor);  // [Function: Person2]
console.log(girl.constructor === Person.prototype.constructor);  //false
console.log(boy.constructor === Person2.prototype.constructor);  //true
// function Pchange(name,age){
//     this.name = "change";
// }
// Person.prototype.constructor = Pchange();   //constructor不可被改变，为什么 ???????????
// console.log(girl.name);

console.log("从 实例 新建另一个实例");
const person1 = new Person();
let  temp = person1.constructor;
const person2 = new person1.constructor;
console.log(person2 instanceof Person); //true

console.log("了解_proto_");
console.log(girl.__proto__ === Person.prototype);//true
console.log(Person.prototype.__proto__ === Object.prototype);//true
console.log(Object.prototype.__proto__); //null
```

# :book: 计算机网络
## Classes
JavaScript中其实并不存在真正的类，ES6的类其实是**基于原型链模拟面向对象的一种语法糖**。
```js
// 定义类
// 定义类
class Parent {
    constructor(name = 'father') {
        //constructor方法是类的默认构造方法，通过new命令生成对象实例时，自动调用该方法。
        //一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
        this.name = name;
    }

    //对属性的操作，注意这里不是真正的function
    get name1(){ //获取age属性时调用此方法
        console.log('get parent name is -- '+this.name);
    }
    set name1(newName){
        this.name = newName;
        console.log('name changed to -- '+newName);
    }

    //静态方法 static 只能通过类名调用,该方法不会被实例继承
    static tell(){
        console.log('tell.....');
    }
}
// 通过extends关键字实现继承
class Child extends Parent {
    constructor(name = 'child'){
        super(name); //子类必须在constructor方法中调用super方法，否则新建实例时会报错。
        this.age = 20;
    }
}

let parent = new Parent('pp');
console.log(parent); // Parent { name: 'pp' }

Parent.tell(); // tell.....

let child = new Child('cc');
console.log(child); // Child { name: 'cc', age: 20 }
child.name1 = 'cc2'; // name changed to -- cc2
child.name1;  // get parent name is -- cc2
```

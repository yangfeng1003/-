## Proxies 代理
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy  
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。  
可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

语法: `let p = new Proxy(target, handler);`  
`target`：用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。  
`handler`：一个对象，其属性是当执行一个操作时定义代理的行为的函数。

`Proxy.revocable();`  //创建一个可撤销的Proxy对象。

应用场景：进行验证
```js
let person = new Proxy({}, validator);

let validator = {
    get: function(obj, prop){
        return prop in obj ? target[prop] : 0;
    },
    set: function(obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
        }
        // The default behavior to store the value
        obj[prop] = value;
    },
    has(obj,prop){
        if(prop === 'age'){
            return true;
        }else
            return false;
    },
    deleteProperty(obj,prop){
        if(prop === 'age'){
            delete obj[prop];
            return true;
        }else{
            return false;
        }
    },
    ownKeys(obj) {
        return Object.keys(obj).filter(item => item!=='name')
    }
};

console.log(person.age); // 0 
person.age = 100; 
person.name = 's';
person.sex = 'girl';
console.log(person);     // { age: 100, name: 's', sex: 'girl' }
console.log('age' in person); // true
console.log(delete person.age); //true 只能删除age属性
console.log(delete person.name); //false
console.log(person); // { name: 's', sex: 'girl' }
console.log(Object.keys(person)); // [ 'sex' ] 过滤掉了name属性
```

##### Proxy支持的拦截操作如下
- `get(target, propKey, receiver)`：拦截对象属性的读取，如proxy.foo和proxy['foo']。方法可以返回任何值。（receiver表示Proxy或者继承Proxy的对象）
- `set(target, propKey, value, receiver)`：拦截对象属性的设置，如proxy.foo = v或proxy['foo'] = v，返回一个布尔值
- `has(target, propKey)`：拦截propKey in proxy的操作，返回一个布尔值。
- `deleteProperty(target, propKey)`：拦截delete proxy[propKey]的操作，返回一个布尔值。
- `ownKeys(target)`：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个可枚举对象。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。


## Reflect
Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。与大多数全局对象不同，Reflect没有构造函数。你不能将其与一个new运算符一起使用，或者将Reflect对象作为一个函数来调用。Reflect的所有属性和方法都是静态的（就像Math对象）。  
其API用法和Proxy一模一样
```js
let abc = {num:123,d:'dd'};
console.log(Reflect.get(abc,'num')); // 123
console.log(Reflect.set(abc,'d','ee')); // true
console.log(Reflect.has(abc,'d' )); // true
console.log(abc); // { num: 123, d: 'ee' }
```
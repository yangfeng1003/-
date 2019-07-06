## Proxy代理器
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。 Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

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
- `getOwnPropertyDescriptor(target, propKey)`：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
- `defineProperty(target, propKey, propDesc)`：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。  
- `preventExtensions(target)`：拦截Object.preventExtensions(proxy)，返回一个布尔值。  
- `getPrototypeOf(target)`：拦截Object.getPrototypeOf(proxy)，返回一个对象。
isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。  
- `setPrototypeOf(target, proto)`：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。  
- `apply(target, object, args)`：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。  
- `construct(target, args)`：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。

##### 实例：使用 Proxy 实现观察者模式
观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。
```js
const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四';
// 输出
// 李四, 20
```
上面代码中，数据对象person是观察目标，函数print是观察者。一旦数据对象发生变化，print就会自动执行。

下面，使用 Proxy 写一个观察者模式的最简单实现，即实现observable和observe这两个函数。思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。
```js
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}
```
上面代码中，先定义了一个Set集合，所有观察者函数都放进这个集合。然后，observable函数返回原始对象的代理，拦截赋值操作。拦截函数set之中，会自动执行所有观察者。

## Reflect
Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。与大多数全局对象不同，Reflect没有构造函数。你不能将其与一个new运算符一起使用，或者将Reflect对象作为一个函数来调用。Reflect的所有属性和方法都是静态的（就像Math对象）。  
Reflect对象与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个。  
（1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。    
（2） 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。  
（3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为  
```js
// 老写法
'assign' in Object // true
// 新写法
Reflect.has(Object, 'assign') // true
```
（4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
```js
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
```
有了Reflect对象以后，很多操作会更易读。
```js
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1
// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1

let abc = {num:123,d:'dd'};
console.log(Reflect.get(abc,'num')); // 123
console.log(Reflect.set(abc,'d','ee')); // true
console.log(Reflect.has(abc,'d' )); // true
console.log(abc); // { num: 123, d: 'ee' }
```
#### 静态方法
- Reflect.get(target, name, receiver)  
Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
- Reflect.set(target, name, value, receiver)  
Reflect.set方法设置target对象的name属性等于value。
- Reflect.has(obj, name)  
Reflect.has方法对应name in obj里面的in运算符。
- Reflect.deleteProperty(obj, name)  
Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。
- Reflect.construct(target, args)  
Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
- Reflect.getPrototypeOf(obj)  
Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
- Reflect.setPrototypeOf(obj, newProto)  
Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。
- Reflect.apply(func, thisArg, args)  
Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。  
一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。  
- Reflect.defineProperty(target, propertyKey, attributes)  
Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。  
- Reflect.getOwnPropertyDescriptor(target, propertyKey)  
Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。  

- Reflect.isExtensible (target)  
Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。

- Reflect.preventExtensions(target)  
Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。

- Reflect.ownKeys (target)  
Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
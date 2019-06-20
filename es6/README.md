# ES6新特性列表
- Let + const:命名声明的新方式
- Arrows,箭头函数
- Classes，类
- Template strings：模板字符串
- Destructuring：解构赋值
- 对象的扩展（简洁表示  属性表达式  Object新增api）
- 数组的扩展 
- 数值的扩展 (二进制八进制字面量 Number Math)
- 正则的扩展
- 函数的扩展（箭头函数  默认参数  rest参数与扩展运算符  尾调用）
- Default + rest + spread：参数默认值，rest参数,扩展运算符
- Map + Set + Weakmap + Weakset：新的数据结构
- Symbols：新的基本类型，独一无二的值
- Iterators + for..of：遍历
- Generators：生成器
- Unicode：更广泛的编码支持
- Modules：语言层面上支持的模块机制
- Module loaders：模块加载器
- Proxies：代理器
- Subclassable built-ins：类的继承
- Promises
- Math + number + string + array + object apis：拓展了一些内置对象的方法
- Reflect api：操作对象的新api


## Let 和 Const
只在声明所在的块级作用域内有效。
只能在声明后使用，不可重复定义。
没有变量提升，都存在暂时性死区（temporal dead zone，简称 TDZ）.  
const用于指定固定值，因此必须初始化`（如果是引用类型，其属性内容是可变的，因为没有改变引用地址）`


## 箭头函数
箭头函数使用类似于`=>`这样的语法定义函数，不过其最大特点在于**和父作用域具有一样的this**。（箭头函数中没有this。如果你在箭头函数中使用了this，那么该this一定就是外层的this）使用箭头函数时再也不用担心this跳来跳去了。
此外如果箭头函数如果定义在另一个函数里面，箭头函数会共享它父函数的arguments变量。


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

在ES6中，内置的Array,Date,DOM Element可以被继承以拓展了。

## 模板字符串
- 模板字符串定义在两个反撇号中；
- 在模板字符串中可以直接换行，格式会得以保留；
- 通过${ }可以很方便的在模板字符串中添加变量；


## 解构赋值
解构使用模式匹配的方法绑定变量和值。解构在绑定失败的时会实现软绑定，即没有匹配值时返回`undefined`

**数组解构**
```js
let point = [1,2,3];
//以前的写法：
let a = 1;
let b = 2;
let c = 3;
let x = point[0];
let y = point[1];

//现在
let [a,b,c] = [1,2,3]; //a 1, b 2, c 3
let [x,y] = point;

//默认值
[a=5, b=7] = [1]; //a 1, b 7

//交换变量 (不需要额外变量)
[a,b] = [b,a]; //a 7, b 1

//忽略不感兴趣的返回值
[a,,b] = f(); //a 1,b 3
function f(){
    return [1, 2, 3];
}

//剩余数组
//当解构一个数组时，可以使用剩余模式，将数组剩余部分赋值给一个变量
[a, ...b] = [1, 2, 3]; //a 1, b [2,3] 注意：...b必须是数组的最后一个元素，右侧不能逗号
```

**对象解构**

对象的解构赋值与数组有一个不同，数组的元素是按次序排列的，变量的取值由它的位置决定。而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
var o = {p: 42, q: true};
var {p, q} = o; //p 42,q true

//无声明赋值
({a, b} = {a: 1, b: 2}); //通过解构，无需声明即可赋值一个变量。
//（...）表达式前面需要一个分号，否则会当成上一行函数执行。"()"的作用是使编译器区分解构语句中的{}和代码块中的{}，{a,b}是一个块而不是对象字面量，正如var {a, b} = {a: 1, b: 2}。

//给新变量名赋值
var {p: foo, q: bar} = o;  //foo 42, bar true

//默认值
var {a = 10, b = 5} = {a: 3};

//函数参数默认值
function drawES2015Chart({size = 'big', cords = { x: 0, y: 0 } } = {}){}

//对象解构中的 Rest
//Rest 属性收集那些尚未被解构模式拾取的剩余可枚举属性键。
let {c, d, ...rest} = {c: 10, d: 20, e: 30, f: 40}; //c 10, d 20, rest { e: 30, f: 40 }

```
**字符串解构**
```js
//将字符串转换成一个类似数组的对象
const [a,b,c,d,e] = 'hello'; //a "h",b "e",c "l",...
//字符串具有length属性
let {length:len} = 'hello'; //len 5 

```


## 对象的扩展
**1. 简洁表示：**
```js
let o = 1,k = 2;
let es5 = {
    o:o,
    k:k,
    methodes5:function(){ }
};
let es6 = {
    o,   //属性简写
    k,
    methodes6(){}   //方法简写
};
```
**2. 属性表达式：**
属性名可以使用表达式形式

**3. ES6中对象新增的api：**
- 可以通过`__proto__`读取或设置当前对象的prototype对象;
- 使用`Object.is({},{})`判断两个对象是否完全相等，类似===;
- `Object.assign(target, source1, source2)`合并对象；（1. 浅拷贝 2. 只包括对象自身可枚举的属性）
- `Object.entries(obj)` 遍历，返回键值对数组。（与for-in区别在于 for-in也枚举原型链中的属性）




## [数组的扩展](https://github.com/yangfeng1003/Knowledge/blob/master/js%E5%9F%BA%E7%A1%80/Array_api.md)
- 转化为数组：`from() of()`
- 查找数组：  `find() findIndex() includes()`  (其他：filter every some)
- 遍历:      `keys() values() entries()`
- 填充数组：  `fill() copyWithin()`   
>这里是arr.keys() 如果是对象,要写成Object.keys(obj)




## 数值的扩展
1. 二进制八进制字面量
```js
0b111110111 === 503 // true  二进制
0o767 === 503 // true  八进制
```
2. `Number.isInteger()` &nbsp;&nbsp;判断整数 （如果接收的非数字，返回false，如'25'-->false）  
`Number.MAX_SAFE_INTEGER`  可以在计算中安全使用的最大整数,安全数能精确表示
`Number.MIN_SAFE_INTEGER`
`Number.isSafeInteger()` &nbsp;&nbsp;范围是-(2^53 - 1) ~ 2^53 - 1,即最大最小安全整数之间

3. `Math.trunc()` 返回整数部分  
`Math.sign()`  返回-1（负数），0，1（正数）。（如果接收的非数字，先转为数字然后返回-1/0/1，否则返回NaN）  
`Math.cbrt()` 立方根  

另：MAX_VALUE 是使用双精度浮点表示表示的最大数字。 大于该值即Infinity，介于安全值和Infinity之间数的无法精确表示。


## 正则的扩展  
修饰符：  
i	执行对大小写不敏感的匹配  
g	执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）  
m	执行多行匹配（multiline ）  
y   全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。(粘连sticky)  
```js
// es5表示方式，下面二者等价
let regex = new RegExp("xyz",'i');
let regex2 = new RegExp(/xyz/i);  //一个正则表达式参数  

//es6表示方式
let regex3 = new RegExp(/xyz/ig,'i'); //允许第二个参数，新的修饰符覆盖原有正则表达式中的修饰符
```
ES6为正则表达式新增了`flags`属性，会返回正则表达式的修饰符。
```js
console.log(regex3.flags); //i  
```

y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。
不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
```js
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s); // ["aaa"]
r2.exec(s); // ["aaa"]

r1.exec(s); // ["aa"]
r2.exec(s); // null
```
与y修饰符相匹配，ES6的正则对象多了`sticky`属性，表示是否设置了y修饰符。
```js
console.log(r1.sticky,r2.sticky); // false true
```
u修饰符（含义是Unicode）
用来正确处理大于\uFFFF的Unicode字符。也就是说，会正确处理四个字节的UTF-16编码。


## 函数的扩展
#### ...的使用（rest与扩展运算符）
**1. Rest剩余参数**
(1) Rest 参数接受函数的多余参数，组成一个数组，放在形参的最后
(2) Rest参数和arguments对象的区别：
	1. rest参数只包括那些没有给出名称的参数，arguments包含所有参数
	2. arguments 对象是伪数组，而rest参数是真正的数组
		从 arguments 转向数组:Array.prototype.slice.call(arguments);
	3. arguments 对象拥有一些自己额外的功能
(3)Rest参数可以被解构
(4)函数的length属性不包含rest
```js
function input2(a,b,...params){
    console.log(params)
}
input2(1,2,3,4)  //[3,4]

function func(a, b, ...rest) {}
func.length // 2
```

**2. 扩展运算符**(与rest刚好是互逆的)
```js
arr1 = [1,2,3]
arr2 = [4,5,6]
arr3 = [...arr1, ...arr2] //[1,2,3,4,5,6] 
```

#### 尾调用与尾递归
**尾调用**     
指某个函数的最后一步是调用另一个函数。    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;函数在调用的时候会在调用栈（call stack）中存有记录，每一条记录叫做一个调用帧（call frame），每调用一个函数，就向栈中push一条记录，函数执行结束后依次向外弹出，直到清空调用栈。   
**尾调用优化：**     
最后一步 return（）一个函数，且没有额外与外层函数其他变量的运算，那么就不需要保留外层函数的调用记录，只要直接用内层函数的调用记录取代外层函数的调用记录就可以了，**调用栈中始终只保持了一条调用帧**。     
意义：节省很大一部分的内存

**尾递归**       
指最后调用函数自身      
**尾递归优化：**     
最后一步函数与其他变量进行运算，改为将**需要运算的变量作为最后调用函数的参数**。    
意义：**节省内存，避免栈溢出，提升性能**.
```js
function factorial (num) {
    if (num === 1) return 1;
    return num * factorial(num - 1);
}
factorial(500000);   // 溢出 Uncaught RangeError: Maximum call stack size exceeded

//改写
function factorial (num, total) {
    if (num === 1) return total;
    return factorial(num - 1, num * total);  // 尾递归优化
}
factorial(500000, 1); 

//继续改写，保证函数只有一个参数
function factorial (n, total = 1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5) // 120 函数此时只有一个参数
```



## Map + Set + Weakmap + Weakset：新的数据结构

**Set** 对象允许存储任何类型的唯一值。
```js
//add() delete() has() clear() size属性
var s = new Set();
s.add("hello").add("goodbye").add("hello");
console.log(s); // Set { 'hello', 'goodbye' }
console.log(s.size); // 2;
console.log(s.has("hello")); // true;
```
**WeakSet** 结构与 Set 类似，也是不重复的值的集合,但是WeakSet的成员只能存放对象引用，不能存放值。   
此外WeakSet中的对象值都是弱引用，如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉. 所以WeakSet对象是无法被枚举的, 没有办法拿到它包含的所有元素。 没有clear()  size
```js
var ws = new WeakSet();
let aa = {};
ws.add({ data: 42 });
ws.add(aa);
console.log('ws',ws);              //ws WeakSet { [items unknown] }
console.log(ws.has('data'));       //false
console.log(ws.has({ data: 42 })); //false
console.log(ws.has(aa));           //true  上面两种写法错误，这里存的是对象的引用
```
**Map** 对象也是键值对的集合，但是Map对象的“键”范围不限于字符串，各种类型的值（包括对象）都可以当作键。
```js
//set()  get()  has()   delete()  clear() size属性
var m = new Map([['hello', 42],[s, 34]]); // 注意初始化赋值是一个数组形式，而且元素也是[]形式
m.set([1,2,3],11);
console.log(m); // Map {'hello' => 42, Set { 'hello', 'goodbye' } => 34, [ 1, 2, 3 ] => 11  }
console.log(m.get(s)); // 34
console.log(m.size); // 3
```
**WeakMap** 结构与Map结构类似，其中的键是弱引用的。其键必须是对象，而值可以是任意的。   
此外WeakMap的键是弱引用。因此WeakMap 的 key 是不可枚举的。 没有clear()  size
```js
var wm = new WeakMap();
wm.set(s, { extra: 42 });
console.log(wm); // WeakMap { [items unknown] }
console.log(wm.get(s)); // { extra: 42 }
```


## Iterators + For..Of
遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。调用这个接口，就会返回一个遍历器对象。
作用：
- 为各种数据结构，提供一个统一的、简便的访问接口
- 使得数据结构的成员能够按某种次序排列
- ES6创造了一种新的遍历命令for...of循环，`for...of实质就是使用Iterator接口`

Iterator的遍历过程：（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。（2）第一次调用指针对象的`next方法`，可以将指针指向数据结构的第一个成员。不断调用指针对象的next方法，直到它指向数据结构的结束位置。每一次调用next方法，都会返回数据结构的当前成员的信息（`一个包含value和done两个属性的对象`，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束）。
```js
//对象自定义iterator接口 要求：实现遍历从start到end的属性的元素
let obj = {
    start:[1,2,3],
    end:[4,5],
    [Symbol.iterator](){
        let index = 0;
        let arr = this.start.concat(this.end);
        return {
            next () {    //必须返回一个next()方法
                return {
                    value:arr[index++],
                    done:index > arr.length
                }
            }
        }
    }
};
//检验
for(let key of obj){
    console.log(key); // 1 2 3 4 5
}
```



## Symbols：新的基本类型，独一无二的值

每个从`Symbol()`返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的。  
`Symbol.for(key)` 方法会根据给定的键 key，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。
```js
var abc = Symbol("key");     //不支持语法："new Symbol()"
console.log(typeof (abc));   // symbol
let abc2 = Symbol("key");
console.log(abc  === abc2);  // false
let abc3 = Symbol.for('key');
console.log(abc2 === abc3);  //false
let abc4 = Symbol.for('key');
console.log(abc3 === abc4);  //true
```
应用场景：作为对象属性的标识符
```js
let obj = {
    [abc]:'abc',
    abc: 123,      // 两个abc属性并不冲突
    "hello": "world"
};   
console.log(obj);  // { abc: 123, hello: 'world', [Symbol(key)]: 'abc' }
```
Symbol类型的key是**不能通过Object.keys()或者for...in来枚举**的,当使用JSON.stringify()将对象转换成JSON字符串的时候，Symbol属性也会被排除在输出内容之外。
```js
console.log(Object.keys(obj));                   // [ 'abc', 'hello' ]
```
1.使用**getOwnPropertySymbols**得到symbol属性
```js
console.log(Object.getOwnPropertySymbols(obj));  // [ Symbol(key) ]
```
2.使用**Reflect**可以得到所有属性
```js
console.log(Reflect.ownKeys(obj));               // [ 'abc', 'hello', Symbol(key) ]
```

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


## Generators
## Modules
## Promise
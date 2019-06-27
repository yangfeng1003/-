# ES6新特性列表
- Let + const
- 箭头函数
- Class，类
- 解构赋值
- 字符串的扩展（模板字符串 Unicode表示 api）
- 对象的扩展（简洁表示  属性表达式  Object新增api）
- 数组的扩展 
- 数值的扩展 (二进制八进制字面量 Number Math)
- 正则的扩展
- 函数的扩展（箭头函数  默认参数  rest参数与扩展运算符  尾调用）
- Default + rest + spread：参数默认值，rest参数,扩展运算符
- Map + Set + Weakmap + Weakset：新的数据结构
- Symbol：新的基本类型，独一无二的值
- Iterators + for..of：遍历
- Proxy：代理器
- Reflect
- Promise
- Generator：生成器
- Decorator：修饰器是一个函数，用来修改类的行为。修饰器只能用于类和类的方法


## Let 和 Const
只在声明所在的块级作用域内有效。
只能在声明后使用，不可重复定义。
没有变量提升，都存在暂时性死区（temporal dead zone，简称 TDZ）.  
const用于指定固定值，因此必须初始化`（如果是引用类型，其属性内容是可变的，因为没有改变引用地址）`


## 箭头函数
箭头函数使用类似于`=>`这样的语法定义函数，不过其最大特点在于**和父作用域具有一样的this**。（箭头函数中没有this。如果你在箭头函数中使用了this，那么该this一定就是外层的this）使用箭头函数时再也不用担心this跳来跳去了。
此外如果箭头函数如果定义在另一个函数里面，箭头函数会共享它父函数的arguments变量。


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









## Generators
## Modules
